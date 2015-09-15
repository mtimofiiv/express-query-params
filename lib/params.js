'use strict';

var moment = require('moment');

var Parser = function(customOptions) {
  var Parsers = {};

  var parseDate = function(date) {
    var dto = moment(date, options.dateFormat).format();
    return options.format === 'sql' ? "DATE('" + dto + "')" : dto;
  };

  var options = {
    parseNum: parseFloat,
    parseDate: parseDate,
    dateFormat: moment.ISO_8601,
    typeCast: true,
    format: 'mongodb'
  };

  var typeCast = function(val) {
    if (!options.typeCast) return val;
    if (val === String(options.parseNum(val))) return options.parseNum(val);
    if (moment(val, options.dateFormat, true).isValid()) return options.parseDate(val);
    return val;
  };

  Parsers.mongodb = function(query) {
    var parsed = {};

    for (var p in query) {
      if (query[p].indexOf('*') > -1) {
        parsed[p] = new RegExp(query[p].split('*').join(''));
      } else if (query[p].indexOf('...') > -1) {
        var range = query[p].split('...');
        parsed[p] = { $gte: typeCast(range[0]), $lte: typeCast(range[1]) };
      } else if (query[p].indexOf('>') > -1) {
        var equal = query[p].indexOf('>=') > -1;
        var operator = equal ? '$gte' : '$gt';
        parsed[p] = {};
        parsed[p][operator] = typeCast(query[p].split(equal ? '>=' : '>').join(''));
      } else if (query[p].indexOf('<') > -1) {
        var equal = query[p].indexOf('<=') > -1;
        var operator = equal ? '$lte' : '$lt';
        parsed[p] = {};
        parsed[p][operator] = typeCast(query[p].split(equal ? '<=' : '<').join(''));
      } else if (query[p] === 'true' || query[p] === 'false') {
        parsed[p] = query[p] === 'true' ? true : false;
      } else {
        parsed[p] = query[p];
      }
    }

    return parsed;
  };

  Parsers.sql = function(query) {
    var parsed = '';

    for (var p in query) {
      parsed += (parsed === '') ? '' : ' AND ';

      if (query[p].indexOf('*') > -1) {
        parsed += p + ' LIKE `%' + query[p].split('*').join('') + '%`';
      } else if (query[p].indexOf('...') > -1) {
        var range = query[p].split('...');
        parsed += p + ' >= ' + typeCast(range[0]) + ' AND ' + p + ' <= ' + typeCast(range[1]);
      } else if (query[p].indexOf('>') > -1) {
        var equal = query[p].indexOf('>=') > -1;
        var operator = equal ? '>=' : '>';
        parsed += p + ' ' + operator + ' ' + typeCast(query[p].split(operator).join(''));
      } else if (query[p].indexOf('<') > -1) {
        var equal = query[p].indexOf('<=') > -1;
        var operator = equal ? '<=' : '<';
        parsed += p + ' ' + operator + ' ' + typeCast(query[p].split(operator).join(''));
      } else {
        parsed += p + ' = `' + query[p] + '`';
      }
    }

    return parsed;
  };

  var middleware = function(req, res, next) {
    if (!req.query || req.query === {}) return next();
    req.parsedQuery = Parsers[options.format](req.query);
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
