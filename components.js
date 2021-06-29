import { Component } from './Component.js'
import { Component2 } from './Component2.js'
import { ComponentAttribute } from './ComponentAttribute.js'
import { ComponentText } from './ComponentText.js'
import { ComponentText2 } from './ComponentText2.js'
import { defineComponent } from './defineComponent.js'

export { Component } from './Component.js'
export { Component2 } from './Component2.js'
export { ComponentAttribute } from './ComponentAttribute.js'
export { ComponentText } from './ComponentText.js'
export { ComponentText2 } from './ComponentText2.js'

const components = [
  Component,
  Component2,
  ComponentText,
  ComponentText2,
  ComponentAttribute
]

components.forEach(defineComponent)
