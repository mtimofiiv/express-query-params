# Express Query Params

Express.js middleware implementing the [API Query Spec](http://mgmco.github.io/api-query-spec/), converting the query to something that can be used to look up the resource.

It works for MongoDB and SQL.

## Installing

```sh
npm i --save express-query-params # with npm
yarn add express-query-params     # with yarn
```

## Basic Usage

This middleware can just be plugged into your stack like so:

```js
const express = require('express')
const queryParams = require('express-query-params')

const app = express()

app.use(queryParams())
```

Inside any downstream middleware, this plugin will create a `parsedQuery` prop on `request`, so you should be able to access it via `request.parsedQuery`.

## Advanced Usage

The middleware accepts a few options to make your life easier:

```js
app.use(queryParams({

  /*
    Will validate dates according to this format - defaults to ISO8601

    If you want to custom-format your dates, please pass a function here. Its first
    argument would be the raw date and it would expect the formatted date as a return.
  */
  dateFormat: 'ISO8601',

  /*
    Here you can overwrite the default behaviour of how dates are handled. If this is
    set to true, it will give you back a JS Date object. If you set it to false, you will
    merely get the string you put in.

    A caveat - if you set `dateFormat` to a custom function, this option will have no effect.

    For SQL, this defaults to false and for Mongo the default is true
  */
  returnJSDate: false|true,

  /*
    Accepts `mongo`, `sql` or `sequelize` - defaults to `mongo`
  */
  format: 'mongo',

  /*
    Use this to prevent certain params from becoming clauses. Useful for things like
    pagination params. Default is `limit`.

    Add their key to this array.

    Is compatible with the whitelistParams (but can't really imagine why you'd want to!)
  */
  blacklistParams: [ 'limit' ],

  /*
    Use this to only allow certain params becoming clauses. Useful for limiting access in
    your API's search functionality.

    Add their key to this array.

    Is compatible with the blacklistParams (but can't really imagine why you'd want to!)
  */
  whitelistParams: []
}));
```

## Formats

So far, this middleware supports `mongodb`, `sql` and `sequelize` as output formats.

 * `mongodb` the output is a javascript object that can be used to query MongoDb.
 * `sql` it will output an object with the following props:
   * `query` - this contains a tokenised query (ie. `$1` replaces raw params)
   * `values` - this is an array of typecast values you can use in your query runner to coincide with the `query` prop
 * `sequelize` outputs an object usable as a where clause in a Sequelize lookup

## A Note About v1

This module has endured a complete re-write from version `0.4.0` to `1.0.0`. Their APIs are only partially compatible now, so please ensure you read the following differences before upgrading:

 * The SQL format now returns an object with a tokenised query and an array of corresponding values, and before it used to return a complete query. This was done because it is out of scope of this module to protect your application from SQL injection, and this is a real conern with a raw query. You can plug these props right into something like Sequelize to make them work! That has built in parameter sanitisation.
 * The `dateFormat` option now works differently, please read about it above if you need it to do something besides default.
 * `moment` is no longer required for this module, it uses only native JS date.

## Contributing

Do you have a database that is not SQL or Mongo? Would love to have your contribution in the form of a PR! Please include a test.

## Tests

```
npm run test
```
