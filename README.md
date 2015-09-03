# Mongo Express Query Params

Express.js middleware implementing the [API Query Spec](http://mgmco.github.io/api-query-spec/), converting the query to something Mongo can lookup.

## Installing

```
npm i --save mongo-express-query-params
```

## Basic Usage

This middleware can just be plugged into your stack like so:

```js
var express = require('express');
var queryParams = require('mongo-express-query-params');

var app = express();

app.use(queryParams());
```

## Advanced Usage

The middleware accepts a few options to make your life easier:

```js
app.use(queryParams({

  // Function to parse integers or floats - defaults to javascript's own parseFloat
  parseNum: parseFloat,

  // Will validate dates according to this format - defaults to ISO_8601
  dateFormat: '2014-01-01',

  // Function to parse dates to the `dateFormat` variable - defaults to Moment.js
  parseDate: function() {},

  // Set this to false to disable type casting and have the output be all strings
  typeCast: true
}));
```

## Tests

```
mocha
```
