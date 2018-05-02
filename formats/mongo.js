const format = require('../lib/format')
const { trimOperators, typeCast } = require('../lib/utils')

module.exports = (options = {}) => (
  rawQuery => {
    const mongo = {}
    const cast = (options.typeCast || typeCast)({ ...options, returnJSDate: true })

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

      if (format.stringContains(value)) mongo[key] = new RegExp(insertValue)
      else if (format.stringIsCaseInsensitive(value)) mongo[key] = new RegExp(`${insertValue}$i`)
      else if (format.isGreaterThan(value)) mongo[key] = { $gt: insertValue }
      else if (format.isGreaterThanOrEqual(value)) mongo[key] = { $gte: insertValue }
      else if (format.isLesserThan(value)) mongo[key] = { $lt: insertValue }
      else if (format.isLesserThanOrEqual(value)) mongo[key] = { $lte: insertValue }
      else if (format.isRange(value)) {
        const [ from, to ] = value.split('...')
        mongo[key] = { $lte: cast(from), $gte: cast(to) }
      } else mongo[key] = insertValue
    }

    return mongo
  }
)
