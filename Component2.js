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
        display: flex;
        flex-row: row;
        justify-content: space-between;
      }
      
      .box__inner {
        flex: 0 1 49%;
        box-sizing: border-box;
        border: 1px solid black;
        background-color: white;
      }
    </style>
    <div class="box">
      <div class="box__inner">
        <slot></slot>
      </div>
      
      <div class="box__inner">
        <slot name="slot2"></slot>
      </div>
    </div>
  </template>
`)

export class Component2 extends HTMLElement {
  constructor() {
    super()
    const templateContent = template.content
    const shadowRoot = this.attachShadow({mode: 'closed'})
    shadowRoot.appendChild(templateContent.cloneNode(true))
  }
}
