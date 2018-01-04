module.exports = function(query, options) {
  var typeCast = require('./utils').typeCast(options);
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
    } else if (query[p][0] === '^') {
      parsed += p + ' ILIKE `' + query[p].slice(1) + '`';
    } else {
      parsed += p + ' = `' + query[p] + '`';
    }
  }

  return parsed;
};