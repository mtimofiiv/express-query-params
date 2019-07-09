const assert = require('assert')

const { middleware } = require('../../lib')
const query = require('../query')

module.exports = () => {
  const instance = middleware()
  const request = { query }
  const emptyRequest = {}

  assert(instance instanceof Function)

  instance(emptyRequest, {}, () => {
    assert.deepStrictEqual(emptyRequest.query, undefined)
    assert.deepStrictEqual(emptyRequest.parsedQuery, undefined)
  })

  instance(request, {}, () => {
    assert(request.query)
    assert(request.parsedQuery)
  })
}
