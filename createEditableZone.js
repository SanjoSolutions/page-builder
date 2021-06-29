import { makeEditableZone } from './makeEditableZone.js'

export function createEditableZone(slotName) {
  const editableZone = document.createElement('div')
  makeEditableZone(editableZone)
  if (slotName !== 'default') {
    editableZone.slot = slotName
  }
  return editableZone
}
