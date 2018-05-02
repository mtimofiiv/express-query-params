/* global test expect */
/* eslint guard-for-in: [off], curly: [off] */

const format = require('../../lib/format')
const query = require('../query')

test('stringContains', () => {
  for (const param in query) {
    expect(format.stringContains(query[param])).toBe(param === 'email')
  }
})

test('stringIsCaseInsensitive', () => {
  for (const param in query) {
    expect(format.stringIsCaseInsensitive(query[param])).toBe(param === 'firstName')
  }
})

test('isRange', () => {
  for (const param in query) {
    const isCorrect = [ 'boughtSomethingOn', 'age' ].indexOf(param) > -1
    expect(format.isRange(query[param])).toBe(isCorrect)
  }
})

test('isGreaterThan', () => {
  for (const param in query) {
    expect(format.isGreaterThan(query[param])).toBe(param === 'createdAt')
  }
})

test('isGreaterThanOrEqual', () => {
  for (const param in query) {
    expect(format.isGreaterThanOrEqual(query[param])).toBe(param === 'friends')
  }
})

test('isLesserThan', () => {
  for (const param in query) {
    expect(format.isLesserThan(query[param])).toBe(param === 'updatedAt')
  }
})

test('isLesserThanOrEqual', () => {
  for (const param in query) {
    expect(format.isLesserThanOrEqual(query[param])).toBe(param === 'followers')
  }
})
