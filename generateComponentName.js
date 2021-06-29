import { pascalCaseToKebabCase } from './pascalCaseToKebabCase.js'

export function generateComponentName(component) {
  return `page-builder-${pascalCaseToKebabCase(component.name)}`
}
