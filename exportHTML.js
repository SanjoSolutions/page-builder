import { generatePageHTML } from './generatePageHTML.js'
import { indentLines } from './indentLines.js'

export function exportHTML(page) {
  let html = ''
  html += '<!doctype html>\n'
  html += '<html lang="en">\n'
  html += '<head>\n'
  html += '  <meta charset="utf-8">\n'
  html += '  <title></title>\n'
  html += '  <meta name="viewport" content="width=device-width, initial-scale=1">\n'
  html += '\n'
  html += '  <script type="module" src="components.js"><'
  html += '/script>\n'
  html += '</head>\n'
  html += '<body>\n'
  html += indentLines(generatePageHTML(page), 1)
  html += '</body>\n'
  html += '</html>\n'

  return html
}
