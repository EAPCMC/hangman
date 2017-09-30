import chai, { expect } from 'chai'
import reducer from './word'

describe('word reducer', () => {
  const initialState = "hello"

  it('returns a word for the initial state', () => {
    expect(reducer()).to.eql(initialState)
  })
})
