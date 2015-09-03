'use strict';

var httpMocks = require('node-mocks-http');
var expect = require('chai').expect;

var app = require('./support/app');
var Module = require('../index')();

describe('Module runs parsers', function() {
  var request;
  var response;

  before(function(done) {
    request = httpMocks.createRequest({
      method: 'GET',
      url: '/',
      query: {
        username: 'steve',
        email: '*@gmail.com*',
        age: '18...25',
        boughtSomethingOn: '2014-07-01...2014-09-01',
        createdAt: '>2014-01-01',
        updatedAt: '<2015-01-01',
        friends: '>=5',
        followers: '<=10'
      }
    });

    response = httpMocks.createResponse();

    Module(request, response);
    done();
  });

  it('parses exact string', function() {
    expect(request.parsedQuery.username).to.equal('steve');
  });

  it('parses partial string', function() {
    expect(String(request.parsedQuery.email)).to.equal('/@gmail.com/');
  });

  it('parses ranges with integers', function() {
    expect(request.parsedQuery.age).to.have.property('$gte', 18);
    expect(request.parsedQuery.age).to.have.property('$lte', 25);
  });

  it('parses ranges with dates', function() {
    expect(request.parsedQuery.boughtSomethingOn).to.have.property('$gte', '2014-07-01T00:00:00+02:00');
    expect(request.parsedQuery.boughtSomethingOn).to.have.property('$lte', '2014-09-01T00:00:00+02:00');
  });

  it('parses greater than', function() {
    expect(request.parsedQuery.createdAt).to.have.property('$gt', '2014-01-01T00:00:00+01:00');
  });

  it('parses lesser than', function() {
    expect(request.parsedQuery.updatedAt).to.have.property('$lt', '2015-01-01T00:00:00+01:00');
  });

  it('parses greater than or equal to', function() {
    expect(request.parsedQuery.friends).to.have.property('$gte', 5);
  });

  it('parses lesser than or equal to', function() {
    expect(request.parsedQuery.followers).to.have.property('$lte', 10);
  });

});
