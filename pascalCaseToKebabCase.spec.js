import { pascalCaseToKebabCase } from './pascalCaseToKebabCase.js'

describe('pascalCaseToKebabCase', () => {
  it('converts from pascal case to kebab case', () => {
    const string = 'ComponentName2'

    const output = pascalCaseToKebabCase(string)

    expect(output).toEqual('component-name2')
  })
})
