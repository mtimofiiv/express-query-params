# Mongo Express Query Params

Express.js middleware implementing the [API Query Spec](http://mgmco.github.io/api-query-spec/), converting the query to something that can be used to look up the resource.

## Installing

```
npm i --save express-query-params
```

## Basic Usage

This middleware can just be plugged into your stack like so:

```js
var express = require('express');
var queryParams = require('express-query-params');

var app = express();

app.use(queryParams());
```

Inside any downstream middleware, this plugin will create a `parsedQuery` object on the `request`. See the [test](https://github.com/mtimofiiv/express-query-params/blob/master/test/test.js) to see how it works.

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
  typeCast: true,

  // Accepts `mongodb` or `sql` - defaults to `mongodb`
  format: 'mongodb'
}));
```

## Formats

So far, this middleware supports `mongodb` and `sql` as output formats.

In case of `mongodb`, the output is a javascript object that can be used to query MongoDb.

In case of `sql`, it will output a `WHERE` clause for you as a string.

## Tests

```
mocha
```
