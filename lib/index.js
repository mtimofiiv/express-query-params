const DEFAULT_OPTIONS = {
  dateFormat: 'ISO8601',
  format: 'mongo',
  blacklistParams: [ 'limit' ],
  whitelistParams: []
}

exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS

exports.middleware = (customOptions = {}) => {
  const options = { ...DEFAULT_OPTIONS, ...customOptions }

  if (
    options.format === 'sequelize'
    && !options.sequelizeOp
  ) throw new Error('Format `sequelize` requires option `sequelizeOp`')

  const parser = require(`../formats/${options.format}`)(options)

  return (req, res, next) => {
    if (!req.query || req.query === {}) return next()
    req.parsedQuery = parser(req.query)
    return next()
  }
}
