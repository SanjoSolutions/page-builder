export function isIncludedAttribute(attribute) {
  const includedAttributes = new Set(['slot'])
  return includedAttributes.has(attribute.name)
}
