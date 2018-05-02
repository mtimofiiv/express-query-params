/* global test expect */

const { middleware } = require('../../lib')
const query = require('../query')

test('Application middleware', () => {
  const instance = middleware()
  const request = { query }
  const emptyRequest = {}

  expect(instance).toBeInstanceOf(Function)

  instance(emptyRequest, {}, () => {
    expect(emptyRequest.query).toBeUndefined()
    expect(emptyRequest.parsedQuery).toBeUndefined()
  })

  instance(request, {}, () => {
    expect(request.query).toBeDefined()
    expect(request.parsedQuery).toBeDefined()
  })
})
