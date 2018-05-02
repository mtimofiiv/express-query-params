const format = require('../lib/format')
const { trimOperators, typeCast } = require('../lib/utils')

module.exports = (options = {}) => (
  rawQuery => {
    const clauses = []
    const values = []
    const cast = (options.typeCast || typeCast)(options)

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

      if (format.isRange(value)) {
        const [ from, to ] = value.split('...')

        values.push(cast(from), cast(to))
        clauses.push(
          `${key} >= $${values.length - 1}`,
          `${key} <= $${values.length}`
        )

        continue
      }

      let clause = ''
      let insertValue = cast(trimOperators(value))
      const index = values.length + 1

      if (format.stringContains(value)) {
        clause = `${key} LIKE $${index}`
        insertValue = `%${insertValue}%`
      } else if (format.stringIsCaseInsensitive(value)) clause = `${key} ILIKE $${index}`
      else if (format.isGreaterThan(value)) clause = `${key} > $${index}`
      else if (format.isGreaterThanOrEqual(value)) clause = `${key} >= $${index}`
      else if (format.isLesserThan(value)) clause = `${key} < $${index}`
      else if (format.isLesserThanOrEqual(value)) clause = `${key} <= $${index}`
      else clause = `${key} = $${index}`

      clauses.push(clause)
      values.push(insertValue)
    }

    return { query: clauses.join(' AND '), values }
  }
)