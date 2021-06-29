export function getUnslottedNodes(element) {
  return Array.from(element.querySelectorAll(':not([slot])'))
}
