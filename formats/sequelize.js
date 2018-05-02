const format = require('../lib/format')
const { trimOperators, typeCast } = require('../lib/utils')

module.exports = (options = {}) => (
  rawQuery => {
    const seqQuery = {}
    const cast = (options.typeCast || typeCast)({ returnJSDate: true, ...options })
    const op = options.sequelizeOp

    for (const key in rawQuery) {
      if (!Object.prototype.hasOwnProperty.call(rawQuery, key)) continue

      if (
        Array.isArray(options.blacklistParams)
        && options.blacklistParams.length > 0
        && options.blacklistParams.indexOf(key) > -1
      ) continue

      if (
        Array.isArray(options.whitelistParams)
        && options.whitelistParams.length > 0
        && options.whitelistParams.indexOf(key) === -1
      ) continue

      const value = rawQuery[key]
      const insertValue = cast(trimOperators(value))

      if (format.stringContains(value)) seqQuery[key] = { [op.like]: `%${insertValue}%` }
      else if (format.stringIsCaseInsensitive(value)) seqQuery[key] = { [op.regexp]: RegExp(`${insertValue}$i`) }
      else if (format.isGreaterThan(value)) seqQuery[key] = { [op.gt]: insertValue }
      else if (format.isGreaterThanOrEqual(value)) seqQuery[key] = { [op.gte]: insertValue }
      else if (format.isLesserThan(value)) seqQuery[key] = { [op.lt]: insertValue }
      else if (format.isLesserThanOrEqual(value)) seqQuery[key] = { [op.lte]: insertValue }
      else if (format.oneOf(value)) seqQuery[key] = { [op.in]: value.split(',') }
      else if (format.isRange(value)) {
        const [ from, to ] = insertValue.split('...')
        seqQuery[key] = { [op.gte]: cast(from), [op.lte]: cast(to) }
      } else seqQuery[key] = insertValue

      if (format.negated(value)) seqQuery[key] = { [op.not]: seqQuery[key] }
    }

    return seqQuery
  }
)
