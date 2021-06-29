import { generateAttributesOutput } from './generateAttributesOutput.js'
import { generatePageHTMLRecursion } from './generatePageHTMLRecursion.js'
import { indentionUnit, indentLines } from './indentLines.js'

export function generateNodeHTML(node) {
  let html = ''
  if (node instanceof Text) {
    const textContent = node.textContent.trim()
    if (textContent.length >= 1) {
      html += textContent + '\n'
    }
  } else if (node.classList.contains('editable-zone')) {
    if (node.slot) {
      const dom = document.createElement('div')
      dom.slot = node.slot
      dom.innerHTML = node.innerHTML
      html += indentLines(generateNodeHTML(dom), 1)
    } else {
      const innerHTML = node.innerHTML
      if (innerHTML.length >= 1) {
        html += indentionUnit + node.innerHTML + '\n'
      }
    }
  } else {
    const innerHTML = generatePageHTMLRecursion(
      node,
      1,
    )
    const tagName = node.tagName.toLowerCase()
    html += `<${tagName}`
    const attributes = generateAttributesOutput(node)
    if (attributes.length >= 1) {
      html += ' '
    }
    html += attributes
    if (innerHTML.length === 0) {
      html += ' /'
    }
    html += '>\n'
    if (innerHTML.length >= 1) {
      html += innerHTML
      html += `</${tagName}>\n`
    }
  }
  return html
}
