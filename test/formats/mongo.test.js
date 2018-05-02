/* global test expect */

const mongoParser = require('../../formats/mongo')
const getQuery = require('../query')
const { DEFAULT_OPTIONS } = require('../../lib')

const correctQuery = {
  username: 'steve',
  email: /@gmail.com/,
  age: {
    $lte: 18,
    $gte: 25
  },
  boughtSomethingOn: {
    $lte: new Date('2014-07-01'),
    $gte: new Date('2014-09-01')
  },
  createdAt: { $gt: new Date('2014-01-01') },
  updatedAt: { $lt: new Date('2015-01-01') },
  friends: { $gte: 5 },
  followers: { $lte: 10 },
  banned: false,
  activated: true,
  firstName: /Steve$i/,
  accountBalance: 25.22
}

test('req.query -> Mongo', () => {
  const parsedQuery = mongoParser(DEFAULT_OPTIONS)(getQuery)
  expect(parsedQuery).toEqual(correctQuery)
})