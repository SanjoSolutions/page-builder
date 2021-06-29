import { createTemplate } from './createTemplate.js'

const template = createTemplate(`
  <template>
    <style>
      :host {
        display: block;
      }
    
      .box {
        border: 1px solid black;
        padding: 2rem;
      }
    </style>
    <div class="box"></div>
  </template>
`)

export class ComponentAttribute extends HTMLElement {
  static get observedAttributes() {
    return ['background-color']
  }

  constructor() {
    super()
    const templateContent = template.content
    const shadowRoot = this.attachShadow({mode: 'closed'})
    shadowRoot.appendChild(templateContent.cloneNode(true))
    this._shadowRoot = shadowRoot
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'background-color') {
      const $box = this._shadowRoot.querySelector('.box')
      $box.style.backgroundColor = newValue
    }
  }
}
