'use strict';

var moment = require('moment');

var parseDate = function(date) {
  return moment(date, options.dateFormat).format();
};

var options = {
  parseNum: parseFloat,
  parseDate: parseDate,
  dateFormat: moment.ISO_8601,
  typeCast: true
};

var typeCast = function(val) {
  if (!options.typeCast) return val;
  if (val === String(options.parseNum(val))) return options.parseNum(val);
  if (moment(val, options.dateFormat, true).isValid()) return options.parseDate(val);
  return val;
}

var parse = function(query) {
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
    } else {
      parsed[p] = query[p];
    }
  }

  return parsed;
};

var middleware = function(req, res) {
  if (!req.query || req.query === {}) return;
  req.parsedQuery = parse(req.query);
};

module.exports = function(customOptions) {
  if (typeof customOptions === 'object') {
    for (var o in customOptions) {
      if (options[o]) options[o] = customOptions[o];
    }
  }

  return middleware;
};
