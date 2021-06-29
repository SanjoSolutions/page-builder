export function getSlottedNodes(element, slotName) {
  return Array.from(element.querySelectorAll(`[slot="${slotName}"]`))
}
