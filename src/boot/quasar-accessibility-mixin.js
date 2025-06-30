import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  console.log('Safe Quasar accessibility mixin started')
  
  app.mixin({
    mounted() {
      // QInput과 QSelect 컴포넌트의 label을 div로 변환 (웹접근성)
      if (['QInput', 'QSelect'].includes(this.$options.name)) {
        if (this.$el && this.$el.tagName === 'LABEL') {
          console.log(`Converting ${this.$options.name} LABEL to DIV safely`)
          
          // DOM을 직접 교체하는 대신 태그 이름만 변경
          const originalElement = this.$el
          
          // 새로운 div 요소 생성
          const div = document.createElement('div')
          
          // 모든 속성 복사 (for 속성 제외)
          Array.from(originalElement.attributes).forEach(attr => {
            if (attr.name !== 'for') {
              div.setAttribute(attr.name, attr.value)
            }
          })
          
          // 자식 노드들을 이동 (innerHTML 대신 실제 노드 이동)
          while (originalElement.firstChild) {
            div.appendChild(originalElement.firstChild)
          }
          
          // 부모에서 교체
          if (originalElement.parentNode) {
            originalElement.parentNode.replaceChild(div, originalElement)
            
            // Vue 인스턴스의 $el 참조 업데이트
            this.$el = div
            
            // 컴포넌트의 내부 참조도 업데이트 (필요한 경우)
            if (this.$.vnode?.el) {
              this.$.vnode.el = div
            }
            if (this.$.subTree?.el) {
              this.$.subTree.el = div
            }
          }
        }
      }
    }
  })
  
  console.log('Safe Quasar accessibility mixin completed')
})
