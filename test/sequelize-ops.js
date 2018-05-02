/*
  Comes from https://github.com/sequelize/sequelize/blob/master/lib/operators.js
  Included along for the sake of tests so we don't have to add a further dependency.
*/

const Op = {
  eq: Symbol.for('eq'),
  ne: Symbol.for('ne'),
  gte: Symbol.for('gte'),
  gt: Symbol.for('gt'),
  lte: Symbol.for('lte'),
  lt: Symbol.for('lt'),
  not: Symbol.for('not'),
  is: Symbol.for('is'),
  in: Symbol.for('in'),
  notIn: Symbol.for('notIn'),
  like: Symbol.for('like'),
  notLike: Symbol.for('notLike'),
  iLike: Symbol.for('iLike'),
  notILike: Symbol.for('notILike'),
  regexp: Symbol.for('regexp'),
  notRegexp: Symbol.for('notRegexp'),
  iRegexp: Symbol.for('iRegexp'),
  notIRegexp: Symbol.for('notIRegexp'),
  between: Symbol.for('between'),
  notBetween: Symbol.for('notBetween'),
  overlap: Symbol.for('overlap'),
  contains: Symbol.for('contains'),
  contained: Symbol.for('contained'),
  adjacent: Symbol.for('adjacent'),
  strictLeft: Symbol.for('strictLeft'),
  strictRight: Symbol.for('strictRight'),
  noExtendRight: Symbol.for('noExtendRight'),
  noExtendLeft: Symbol.for('noExtendLeft'),
  and: Symbol.for('and'),
  or: Symbol.for('or'),
  any: Symbol.for('any'),
  all: Symbol.for('all'),
  values: Symbol.for('values'),
  col: Symbol.for('col'),
  placeholder: Symbol.for('placeholder'),
  join: Symbol.for('join')
}

module.exports = Op
