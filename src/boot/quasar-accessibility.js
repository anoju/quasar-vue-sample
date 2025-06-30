import { boot } from 'quasar/wrappers'

export default boot(() => {
  console.log('QField Label to Div Converter started...')

  // MutationObserver로 DOM 변화 감시
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // q-field 클래스를 가진 label 태그 직접 확인
          if (node.classList?.contains('q-field') && node.tagName === 'LABEL') {
            convertLabelToDiv(node)
          }

          // 하위 요소들에서 q-field label 태그 찾기
          const qFieldLabels = node.querySelectorAll?.('label.q-field')
          qFieldLabels?.forEach(convertLabelToDiv)
        }
      })
    })
  })

  // Label을 Div로 변환하는 함수
  function convertLabelToDiv(labelElement) {
    console.log('Converting QField LABEL to DIV for accessibility')

    const div = document.createElement('div')

    // 모든 속성 복사 (for 속성 제외 - 웹접근성)
    Array.from(labelElement.attributes).forEach((attr) => {
      if (attr.name !== 'for') {
        div.setAttribute(attr.name, attr.value)
      }
    })

    // 내용 복사
    div.innerHTML = labelElement.innerHTML

    // DOM에서 교체
    if (labelElement.parentNode) {
      labelElement.parentNode.replaceChild(div, labelElement)
    }
  }

  // DOM 전체 감시 시작
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })

  // 페이지 로드 시 기존 label.q-field 요소들도 변환
  document.addEventListener('DOMContentLoaded', () => {
    const existingLabels = document.querySelectorAll('label.q-field')
    existingLabels.forEach(convertLabelToDiv)
  })

  console.log('QField accessibility converter initialized')
})
