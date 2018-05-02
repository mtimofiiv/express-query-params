const stringContains = raw => raw[0] === '*' || raw[raw.length - 1] === '*'
const stringIsCaseInsensitive = raw => raw[0] === '^'
const isRange = raw => (/\.\.\./).test(raw)
const isGreaterThan = raw => raw[0] === '>' && raw[1] !== '='
const isGreaterThanOrEqual = raw => raw.slice(0, 2) === '>='
const isLesserThan = raw => raw[0] === '<' && raw[1] !== '='
const isLesserThanOrEqual = raw => raw.slice(0, 2) === '<='
const oneOf = raw => raw.indexOf(',') > -1
const negated = raw => raw[0] === '!'

module.exports = {
  stringContains(raw) { return stringContains(String(raw)) },
  stringIsCaseInsensitive(raw) { return stringIsCaseInsensitive(String(raw)) },
  isRange(raw) { return isRange(String(raw)) },
  isGreaterThan(raw) { return isGreaterThan(String(raw)) },
  isGreaterThanOrEqual(raw) { return isGreaterThanOrEqual(String(raw)) },
  isLesserThan(raw) { return isLesserThan(String(raw)) },
  isLesserThanOrEqual(raw) { return isLesserThanOrEqual(String(raw)) },
  oneOf(raw) { return oneOf(String(raw)) },
  negated(raw) { return negated(String(raw)) }
}
