const assert = require('assert')

const { typeCast, trimOperators } = require('../../lib/utils')

const date = '2018-05-02T09:52:52.623Z'

module.exports = () => {
  assert.deepEqual(typeCast()(42), 42)
  assert.deepEqual(typeCast()('42'), 42)
  assert.deepEqual(typeCast()('true'), true)
  assert.deepEqual(typeCast()('false'), false)
  assert.deepEqual(typeCast()(date), date)

  assert(typeCast()({}) instanceof Object)
  assert(typeCast()([]) instanceof Array)

  assert(typeCast({ returnJSDate: true })(date) instanceof Date)
  assert.deepEqual(typeCast({ dateFormat: d => `wut${d}` })(date), `wut${date}`)

  assert.deepEqual(trimOperators('*butts'), 'butts')
  assert.deepEqual(trimOperators('^butts'), 'butts')
  assert.deepEqual(trimOperators('>=butts'), 'butts')
  assert.deepEqual(trimOperators('>butts'), 'butts')
  assert.deepEqual(trimOperators('<butts'), 'butts')
  assert.deepEqual(trimOperators('<=butts'), 'butts')
  assert.deepEqual(trimOperators('butts'), 'butts')
}
