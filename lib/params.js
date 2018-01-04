'use strict';

var utils = require('./utils');
var moment = require('moment');

var Parser = function(customOptions) {
  var Parsers = {};

  var options = {
    parseNum: parseFloat,
    dateFormat: moment.ISO_8601,
    typeCast: true,
    format: 'mongodb'
  };

  options.parseDate = utils.parseDate(options);

  Parsers.mongodb = require('./mongo');
  Parsers.sql = require('./sql');

  var middleware = function(req, res, next) {
    if (!req.query || req.query === {}) return next();
    req.parsedQuery = Parsers[options.format](req.query, options);
    return next();
  };

  if (typeof customOptions === 'object') {
    for (var o in customOptions) {
      if (options[o]) options[o] = customOptions[o];
    }
  };

  return middleware;

};

module.exports = Parser;
