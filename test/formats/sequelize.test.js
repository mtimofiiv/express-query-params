const assert = require('assert')

const sequelizeParser = require('../../formats/sequelize')
const getQuery = require('../query')
const sequelizeOp = require('../sequelize-ops')

const correctQuery = {
  username: 'steve',
  email: { [sequelizeOp.like]: '%@gmail.com%' },
  age: {
    [sequelizeOp.gte]: 18,
    [sequelizeOp.lte]: 25
  },
  boughtSomethingOn: {
    [sequelizeOp.lte]: new Date('2014-09-01'),
    [sequelizeOp.gte]: new Date('2014-07-01')
  },
  createdAt: { [sequelizeOp.gt]: new Date('2014-01-01') },
  updatedAt: { [sequelizeOp.lt]: new Date('2015-01-01') },
  friends: { [sequelizeOp.gte]: 5 },
  followers: { [sequelizeOp.lte]: 10 },
  banned: false,
  activated: true,
  firstName: { [sequelizeOp.regexp]: /Steve$i/ },
  accountBalance: 25.22,
  favouriteColours: { [sequelizeOp.in]: [ 'red', 'green', 'blue' ] },
  hairStyle: { [sequelizeOp.not]: 'bald' },
  income: {
    [sequelizeOp.not]: {
      [sequelizeOp.lte]: 50000,
      [sequelizeOp.gte]: 30000
    }
  }
}

module.exports = () => {
  const parsedQuery = sequelizeParser({
    format: 'sequelize',
    blacklistParams: [ 'limit' ],
    sequelizeOp
  })(getQuery)

  assert.deepStrictEqual(parsedQuery, correctQuery)
}
