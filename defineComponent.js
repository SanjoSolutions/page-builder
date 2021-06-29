import { generateComponentName } from './generateComponentName.js'

export function defineComponent(component) {
  customElements.define(generateComponentName(component), component)
}
