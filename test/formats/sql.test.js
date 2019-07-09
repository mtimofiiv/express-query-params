const assert = require('assert')

const sqlParser = require('../../formats/sql')
const getQuery = require('../query')

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
  25.22,
  'red',
  'green',
  'blue',
  'bald',
  30000,
  50000
]

const correctQuery = [
  'username = $1',
  'email LIKE $2',
  'age >= $3',
  'age <= $4',
  'boughtSomethingOn >= $5',
  'boughtSomethingOn <= $6',
  'createdAt > $7',
  'updatedAt < $8',
  'friends >= $9',
  'followers <= $10',
  'banned = $11',
  'activated = $12',
  'firstName ILIKE $13',
  'accountBalance = $14',
  'favouriteColours IN ($15, $16, $17)',
  'NOT hairStyle = $18',
  'NOT (income >= $19 AND income <= $20)'
].join(' AND ')

module.exports = () => {
  const { query, values } = sqlParser({ blacklistParams: [ 'limit' ] })(getQuery)

  assert.equal(query, correctQuery)
  assert.deepStrictEqual(values, correctValues)
}
