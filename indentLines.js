export const numberOfSpacesPerIndention = 2
export const indentionUnit = ' '.repeat(numberOfSpacesPerIndention)

export function indentLines(text, numberOfIndentions) {
  const indention = indentionUnit.repeat(numberOfIndentions)
  let result = indention + text.replace(/\n/g, '\n' + indention)
  if (text.endsWith('\n')) {
    result = result.substr(0, result.length - indention.length)
  }
  return result
}
