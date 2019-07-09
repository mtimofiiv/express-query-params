const assert = require('assert')

const format = require('../../lib/format')
const query = require('../query')

module.exports = () => {
  // stringContains
  for (const param of Object.keys(query)) (
    assert.deepStrictEqual(format.stringContains(query[param]), param === 'email')
  )

  // stringIsCaseInsensitive
  for (const param of Object.keys(query)) (
    assert.deepStrictEqual(format.stringIsCaseInsensitive(query[param]), param === 'firstName')
  )

  // isRange
  for (const param of Object.keys(query)) {
    const isCorrect = [ 'boughtSomethingOn', 'age', 'income' ].indexOf(param) > -1
    assert.deepStrictEqual(format.isRange(query[param]), isCorrect)
  }

  // isGreaterThan
  for (const param of Object.keys(query)) (
    assert.deepStrictEqual(format.isGreaterThan(query[param]), param === 'createdAt')
  )

  // isGreaterThanOrEqual
  for (const param of Object.keys(query)) (
    assert.deepStrictEqual(format.isGreaterThanOrEqual(query[param]), param === 'friends')
  )

  // isLesserThan
  for (const param of Object.keys(query)) (
    assert.deepStrictEqual(format.isLesserThan(query[param]), param === 'updatedAt')
  )

  // isLesserThanOrEqual
  for (const param of Object.keys(query)) (
    assert.deepStrictEqual(format.isLesserThanOrEqual(query[param]), param === 'followers')
  )

  // oneOf
  for (const param of Object.keys(query)) (
    assert.deepStrictEqual(format.oneOf(query[param]), param === 'favouriteColours')
  )

  // negated
  for (const param of Object.keys(query)) (
    assert.deepStrictEqual(format.negated(query[param]), [ 'hairStyle', 'income' ].indexOf(param) > -1)
  )
}
