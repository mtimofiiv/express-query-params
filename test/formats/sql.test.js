/* global test expect */

const sqlParser = require('../../formats/sql')
const getQuery = require('../query')
const { DEFAULT_OPTIONS } = require('../../lib')

const correctValues = [
  'steve',
  '%@gmail.com%',
  18,
  25,
  '2014-07-01',
  '2014-09-01',
  '2014-01-01',
  '2015-01-01',
  5,
  10,
  false,
  true,
  'Steve',
  25.22
]

const correctQuery = 'username = $1 AND email LIKE $2 AND age >= $3 AND age <= $4 AND boughtSomethingOn >= $5 AND boughtSomethingOn <= $6 AND createdAt > $7 AND updatedAt < $8 AND friends >= $9 AND followers <= $10 AND banned = $11 AND activated = $12 AND firstName ILIKE $13 AND accountBalance = $14'

test('req.query -> SQL', () => {
  const { query, values } = sqlParser(DEFAULT_OPTIONS)(getQuery)

  expect(query).toBe(correctQuery)
  for (const value of values) expect(correctValues).toContain(value)
})
