import {
  Component,
  Component2,
  ComponentAttribute,
  ComponentText,
  ComponentText2
} from './components.js'
import { createDOM } from './createDOM.js'
import { createEditableZone } from './createEditableZone.js'
import { exportHTML } from './exportHTML.js'
import { generateAttributesOutput } from './generateAttributesOutput.js'
import { generateComponentName } from './generateComponentName.js'
import { getChildNodesForSlot } from './getChildNodesForSlot.js'
import { makeEditableZone } from './makeEditableZone.js'

function main() {
  let isDragging = false

  const components = [
    {
      tagName: 'page-builder-component',
      class: Component,
      slots: {
        default: {}
      },
    },
    {
      tagName: 'page-builder-component2',
      class: Component2,
      slots: {
        default: {},
        slot2: {}
      }
    },
    {
      tagName: 'page-builder-component-text',
      class: ComponentText,
      slots: {
        default: {
          editable: true
        }
      }
    },
    {
      tagName: 'page-builder-component-text2',
      class: ComponentText2,
      slots: {
        default: {
          editable: true
        },
        slot2: {
          editable: true
        }
      }
    },
    {
      tagName: 'page-builder-component-attribute',
      class: ComponentAttribute,
      slots: {},
    }
  ]
  const componentsMap = new Map(
    components.map(component => [component.tagName, component])
  )

  const $components = document.querySelector('.components')

  for (const component of components) {
    const $label = document.createElement('h3')
    $label.textContent = component.tagName

    const $component = document.createElement(component.tagName)
    $component.draggable = true

    for (const [slotName, slot] of Object.entries(component.slots)) {
      const dropZone = createDropZone()
      if (slotName !== 'default') {
        dropZone.slot = slotName
      }
      $component.appendChild(dropZone)
    }

    $components.appendChild($label)
    $components.appendChild($component)
  }

  for (const component of $components.children) {
    component.addEventListener('dragstart', function (event) {
      console.log('dragstart', event)
      event.dataTransfer.setData(
        'text/plain',
        event.target.tagName.toLowerCase()
      )
      event.dataTransfer.dropEffect = 'copy'
    })

    component.addEventListener('dragend', function (event) {
      console.log('dragend', event)
    })
  }

  const $page = document.querySelector('.page')

  let dropZone = null

  $page.addEventListener('dragover', function (event) {
    console.log('dragover', event)
    event.preventDefault()

    const target = event.target
    if (target.classList.contains('drop-zone')) {
      const componentTagName = event.dataTransfer.getData('text/plain')
      const component = getComponent(componentTagName)
      if (component) {
        event.dataTransfer.dropEffect = 'copy'

        event.target.classList.add('drop-zone--drag-over')
      }
    }
  })

  $page.addEventListener('dragleave', function (event) {
    console.log('dragleave', event)

    const target = event.target
    if (target.classList.contains('drop-zone')) {
      const componentTagName = event.dataTransfer.getData('text/plain')
      const component = getComponent(componentTagName)
      if (component) {
        target.classList.remove('drop-zone--drag-over')
      }
    }
  })

  $page.addEventListener('drop', function (event) {
    console.log('drop', event)
    event.preventDefault()
    const target = event.target
    if (target.classList.contains('drop-zone')) {
      const componentTagName = event.dataTransfer.getData('text/plain')
      const component = getComponent(componentTagName)
      if (component) {
        const componentInstance = document.createElement(component.tagName)

        createZones(component, componentInstance)

        if (target.slot) {
          componentInstance.slot = target.slot
        }
        target.replaceWith(componentInstance)

        const dropZone1 = createDropZone()
        if (componentInstance.slot) {
          dropZone1.slot = componentInstance.slot
        }
        componentInstance.insertAdjacentElement(
          'beforebegin',
          dropZone1
        )

        const dropZone2 = createDropZone()
        if (componentInstance.slot) {
          dropZone2.slot = componentInstance.slot
        }
        componentInstance.insertAdjacentElement(
          'afterend',
          dropZone2
        )
      }
    }
    event.dataTransfer.clearData()
  })

  function createZones(component, componentInstance) {
    for (const [slotName, slot] of Object.entries(component.slots)) {
      if (slot.editable) {
        const editableZone = createEditableZone(slotName)
        componentInstance.appendChild(editableZone)
      } else {
        const dropZone = createDropZone()
        if (slotName !== 'default') {
          dropZone.slot = slotName
        }
        componentInstance.appendChild(dropZone)
      }
    }
  }

  function createDropZone() {
    const dropZone = document.createElement('div')
    dropZone.classList.add('drop-zone')
    return dropZone
  }

  function removeDropZone() {
    if (dropZone) {
      dropZone.remove()
      dropZone = null
    }
  }

  function getComponent(tagName) {
    return componentsMap.get(tagName)
  }

  function isComponent(element) {
    const tagName = element.tagName.toLowerCase()
    const componentTagNames = new Set(getComponentTagNames())
    return componentTagNames.has(tagName)
  }

  function getComponentTagNames() {
    return Array.from(componentsMap.keys())
  }

  const types = [
    {
      description: 'HTML',
      accept: {
        'text/html': ['.html']
      }
    }
  ]

  const $save = document.getElementById('save')
  $save.addEventListener('click', async function (event) {
    const html = exportHTML($page)
    console.log(html)
    const fileHandle = await showSaveFilePicker({
      types
    })
    const writable = await fileHandle.createWritable()
    await writable.write(html)
    await writable.close()
    console.log('a')
  })

  const $load = document.getElementById('load')
  $load.addEventListener('click', async function (event) {
    const [fileHandle] = await showOpenFilePicker({
      excludeAcceptAllOption: true,
      types
    })
    const file = await fileHandle.getFile()
    const html = await file.text()
    console.log(html)
    const dom = createDOM(html)
    $page.innerHTML = dom.body.innerHTML
    addDropZones($page)
    makeEditable($page)
  })

  function addDropZones(element) {
    addDropZonesRecursion(element)
  }

  function addDropZonesRecursion(element) {
    const children = Array.from(element.children)
    for (const element of children) {
      const dropZone = createDropZone()
      element.insertAdjacentElement(
        'beforebegin',
        dropZone
      )

      const component = getComponent(element.tagName.toLowerCase())

      if (component) {
        for (const [slotName, slot] of Object.entries(component.slots)) {
          if (!slot.editable) {
            const dropZone = createDropZone()
            if (slotName !== 'default') {
              dropZone.slot = slotName
            }
            element.appendChild(dropZone)
          }
        }
      }

      if (!(element.classList.contains('editable-zone'))) {
        addDropZonesRecursion(element)
      }
    }

    const dropZone = createDropZone()
    element.appendChild(dropZone)
  }

  function makeEditable($page) {
    makeEditableRecursion($page)
  }

  function makeEditableRecursion(element) {
    const children = Array.from(element.children)
    for (const element of children) {
      const component = getComponent(element.tagName.toLowerCase())

      if (component) {
        for (const [slotName, slot] of Object.entries(component.slots)) {
          if (slot.editable) {
            if (slotName === 'default') {
              const nodes = getChildNodesForSlot(element, 'default')
              const editableZone = createEditableZone(slotName)
              for (const node of nodes) {
                editableZone.appendChild(node)
              }
              makeEditableZone(element)
            } else {
              const slotContentElement = element
                .querySelector(`[slot="${slotName}"]`)
              if (slotContentElement) {
                makeEditableZone(slotContentElement)
              } else {
                const editableZone = createEditableZone(slotName)
                element.appendChild(editableZone)
              }
            }
          }
        }
      }
    }
  }

  let selectedElement = null

  $page.addEventListener('click', function (event) {
    const target = event.target
    if (isComponent(target)) {
      if (selectedElement) {
        selectedElement.classList.remove('element--selected')
      }
      selectedElement = target
      selectedElement.classList.add('element--selected')
      updateAttributes()
    }
  })

  const $attributes = document.getElementById('attributes')

  function updateAttributes() {
    const $attributesTable = createAttributesTable(selectedElement)
    $attributes.innerHTML = ''
    $attributes.appendChild($attributesTable)
  }

  function createAttributesTable(selectedElement) {
    const $attributesTable = document.createElement('table')
    const $tbody = document.createElement('tbody')
    const component = getComponent(selectedElement.tagName.toLowerCase())
    const attributes = component.class.observedAttributes
    for (const attribute of attributes) {
      const $tr = document.createElement('tr')
      const $th = document.createElement('th')
      $th.scope = 'row'
      $th.textContent = attribute
      const $td = document.createElement('td')
      const $input = document.createElement('input')
      $input.addEventListener('change', function (event) {
        const value = $input.value
        selectedElement.setAttribute(attribute, value)
      })
      $td.appendChild($input)
      $tr.appendChild($th)
      $tr.appendChild($td)
      $tbody.appendChild($tr)
    }
    $attributesTable.appendChild($tbody)
    return $attributesTable
  }
 }

document.addEventListener('DOMContentLoaded', main)
