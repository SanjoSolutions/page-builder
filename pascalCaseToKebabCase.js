export function pascalCaseToKebabCase(string) {
  return (
    string[0].toLowerCase() +
    string.substr(1).replace(
      /[A-Z]/g,
      substring => `-${substring.toLowerCase()}`,
    )
  )
}
