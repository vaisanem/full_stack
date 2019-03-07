import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  deepFreeze(initialState)

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }

    const newState = counterReducer(initialState, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('neutral is incremented', () => {
    const action = {
      type: 'OK'
    }

    const newState = counterReducer(initialState, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }

    const newState = counterReducer(initialState, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('reset works', () => {
    const action = {
      type: 'ZERO'
    }
    const state = {
      good: 1,
      ok: 0,
      bad: 2
    }
    deepFreeze(state)
    
    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })
})