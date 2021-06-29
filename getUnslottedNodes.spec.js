import { getUnslottedNodes } from './getUnslottedNodes.js'

describe('getUnslottedNodes', () => {
  it('returns nodes with the absence of a slot attribute', () => {
    const root = document.createElement('div')
    const slottedNode = document.createElement('div')
    slottedNode.slot = 'slot1'
    const unslottedNode1 = document.createElement('div')
    const unslottedNode2 = document.createElement('div')
    root.appendChild(slottedNode)
    root.appendChild(unslottedNode1)
    root.appendChild(unslottedNode2)

    const unslottedNodes = getUnslottedNodes(root)

    expect(unslottedNodes).toEqual([unslottedNode1, unslottedNode2])
  })
})
