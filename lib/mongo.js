module.exports = function(query, options) {
  var typeCast = require('./utils').typeCast(options);
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
    } else if (query[p][0] === '^') {
      parsed[p] = new RegExp(query[p] + '$', 'i');
    } else {
      parsed[p] = query[p];
    }
  }

  return parsed;
};