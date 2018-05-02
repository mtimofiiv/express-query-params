/* global test expect */

const { typeCast, trimOperators } = require('../../lib/utils')

const date = '2018-05-02T09:52:52.623Z'

test('typeCast()', () => {
  expect(typeCast()(42)).toBe(42)
  expect(typeCast()('42')).toBe(42)
  expect(typeCast()('true')).toBe(true)
  expect(typeCast()('false')).toBe(false)
  expect(typeCast()(date)).toBe(date)
  expect(typeCast()({})).toBeInstanceOf(Object)
  expect(typeCast()([])).toBeInstanceOf(Array)

  expect(typeCast({ returnJSDate: true })(date)).toBeInstanceOf(Date)
  expect(typeCast({ dateFormat: d => `wut${d}` })(date)).toBe(`wut${date}`)
})

test('trimOperators()', () => {
  expect(trimOperators('*butts')).toBe('butts')
  expect(trimOperators('^butts')).toBe('butts')
  expect(trimOperators('>=butts')).toBe('butts')
  expect(trimOperators('>butts')).toBe('butts')
  expect(trimOperators('<butts')).toBe('butts')
  expect(trimOperators('<=butts')).toBe('butts')
  expect(trimOperators('butts')).toBe('butts')
})
