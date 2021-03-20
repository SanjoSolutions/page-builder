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
        background-color: yellow;
      }
      
      .box__inner {
        box-sizing: border-box;
        border: 1px solid black;
        background-color: white;
      }
    </style>
    <div class="box">
      <div class="box__inner">
        <slot></slot>
      </div>
    </div>
  </template>
`)

export class ComponentText extends HTMLElement {
  constructor() {
    super()
    const templateContent = template.content
    const shadowRoot = this.attachShadow({mode: 'closed'})
    shadowRoot.appendChild(templateContent.cloneNode(true))
  }
}
