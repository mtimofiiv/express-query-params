'use strict';

var express = require('express')();
var Module = require('../../index');
express.use(Module());

express.get('/', function(req, res, next) {
  return res.send(req.parsedQuery);
});

express.listen(9292, function() {});

module.exports = express;
