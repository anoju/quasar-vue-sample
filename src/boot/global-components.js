// src/boot/global-components.js
const components = import.meta.glob('../components/base/*.vue', { eager: true })

export default ({ app }) => {
  Object.entries(components).forEach(([path, module]) => {
    const componentName = path
      .split('/')
      .pop()
      ?.replace(/\.\w+$/, '')

    app.component(componentName, module.default)
  })
}
