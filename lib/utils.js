var moment = require('moment');

exports.typeCast = function(options) {
  return function(val) {
    if (!options.typeCast) return val;
    if (val === String(options.parseNum(val))) return options.parseNum(val);
    if (moment(val, options.dateFormat, true).isValid()) return options.parseDate(val);
    return val;
  }
};

exports.parseDate = function(options) {
  return function(date) {
    var dto = moment(date, options.dateFormat).format();
    return options.format === 'sql' ? "DATE('" + dto + "')" : dto;
  }
};