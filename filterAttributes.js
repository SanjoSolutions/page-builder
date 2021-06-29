import { isIncludedAttribute } from './isIncludedAttribute.js'

export function filterAttributes(attributes) {
  return attributes.filter(isIncludedAttribute)
}
