import { generateNodeHTML } from './generateNodeHTML.js'
import { indentionUnit, indentLines } from './indentLines.js'

export function generatePageHTMLRecursion(element, numberOfIndentions = 0) {
  const indention = indentionUnit.repeat(numberOfIndentions)
  let html = ''
  let nodes = Array.from(element.childNodes)
    .filter(node => !node.classList?.contains('drop-zone'))
  for (const node of nodes) {
    html += generateNodeHTML(node)
  }
  html = indentLines(html, numberOfIndentions)
  return html
}
