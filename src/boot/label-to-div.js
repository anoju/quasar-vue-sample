// src/boot/force-div-conversion.js
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  // DOM이 완전히 로드된 후 실행
  const convertQInputsToDiv = () => {
    console.log('Starting Q-Input to Div conversion...')
    
    // 모든 가능한 q-input 관련 요소를 찾아서 변환
    const selectors = [
      '.q-input',
      'label.q-field',
      'label[class*="q-input"]',
      'label[class*="q-field"]'
    ]
    
    let converted = 0
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector)
      
      elements.forEach(element => {
        if (element.tagName === 'LABEL') {
          console.log(`Converting LABEL to DIV: ${selector}`)
          
          // 새 div 요소 생성
          const div = document.createElement('div')
          
          // 모든 속성 복사 (for 속성 제외)
          Array.from(element.attributes).forEach(attr => {
            if (attr.name !== 'for') {
              div.setAttribute(attr.name, attr.value)
            }
          })
          
          // 자식 요소들 이동
          while (element.firstChild) {
            div.appendChild(element.firstChild)
          }
          
          // 부모에서 교체
          if (element.parentNode) {
            element.parentNode.replaceChild(div, element)
            converted++
            console.log(`Converted ${converted} element(s)`)
          }
        }
      })
    })
    
    console.log(`Total converted: ${converted} elements`)
    return converted
  }
  
  // 여러 시점에서 변환 시도
  const attemptConversion = () => {
    // 즉시 실행
    setTimeout(() => convertQInputsToDiv(), 0)
    
    // 100ms 후 재시도
    setTimeout(() => convertQInputsToDiv(), 100)
    
    // 500ms 후 재시도  
    setTimeout(() => convertQInputsToDiv(), 500)
    
    // 1초 후 재시도
    setTimeout(() => convertQInputsToDiv(), 1000)
  }
  
  // MutationObserver로 새로 추가되는 요소 감지
  const observer = new MutationObserver((mutations) => {
    let shouldConvert = false
    
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // q-input 관련 요소가 추가되었는지 확인
          if (node.classList?.contains('q-input') || 
              node.classList?.contains('q-field') ||
              node.querySelector?.('.q-input, .q-field')) {
            shouldConvert = true
          }
        }
      })
    })
    
    if (shouldConvert) {
      console.log('New Q-Input detected, converting...')
      setTimeout(() => convertQInputsToDiv(), 50)
    }
  })
  
  // 전역 mixin으로 모든 컴포넌트에 적용
  app.mixin({
    mounted() {
      attemptConversion()
      
      // MutationObserver 시작 (한 번만)
      if (!window.qInputObserverStarted) {
        observer.observe(document.body, {
          childList: true,
          subtree: true
        })
        window.qInputObserverStarted = true
      }
    }
  })
  
  // 페이지 로드 완료 후에도 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attemptConversion)
  } else {
    attemptConversion()
  }
  
  // 윈도우 로드 후에도 실행
  window.addEventListener('load', attemptConversion)
})
