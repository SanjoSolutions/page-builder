import { generateComponentName } from './generateComponentName.js'

describe('components', () => {
  describe('generateComponentName', () => {
    it('generates the component name from the component', () => {
      class ComponentName2 {

      }

      const componentName = generateComponentName(ComponentName2)

      expect(componentName).toEqual('page-builder-component-name2')
    })
  })
})
