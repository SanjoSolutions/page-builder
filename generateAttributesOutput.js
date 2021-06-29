import { filterAttributes } from './filterAttributes.js'
import { generateAttributeString } from './generateAttributeString.js'

export function generateAttributesOutput(element) {
  return filterAttributes(Array.from(element.attributes))
    .map(generateAttributeString)
    .join(' ')
}
