import { getSlottedNodes } from './getSlottedNodes.js'
import { getUnslottedNodes } from './getUnslottedNodes.js'

export function getChildNodesForSlot(element, slotName) {
  let childNodes
  if (slotName === 'default') {
    childNodes = getUnslottedNodes(element)
  } else {
    childNodes = getSlottedNodes(element, slotName)
  }
}
