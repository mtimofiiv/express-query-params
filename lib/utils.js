/*
  Taken from this blog post:
  https://www.myintervals.com/blog/2009/05/20/iso-8601-date-validation-that-doesnt-suck/

  I removed a couple needless escapes.
*/
const ISO8601_REGEX = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/
const OPERATOR_TRIM_REGEX = /(\*|>=?|<=?|\^|!)/g

exports.typeCast = ({ dateFormat = 'iso8601', returnJSDate } = {}) => (
  rawValue => {
    if (rawValue === Number(rawValue).toString()) return Number(rawValue)

    if ([ 'true', 'false' ].indexOf(rawValue) > -1) return rawValue === 'true'

    if (typeof dateFormat === 'function' && dateFormat(rawValue)) return dateFormat(rawValue)

    if (
      (dateFormat.toLowerCase() === 'iso8601' && ISO8601_REGEX.test(rawValue)) &&
      returnJSDate
    ) return new Date(rawValue)

    return rawValue
  }
)

exports.trimOperators = raw => String(raw).replace(OPERATOR_TRIM_REGEX, '')
