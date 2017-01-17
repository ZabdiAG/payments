'use strict';

var ConektaCard = require('../lib/conektaCard');
var NextPayments = require('../lib');
var expect = require('chai').expect;

describe('NextPayments', function () {
  it('implements process fn', function () {
    expect(NextPayments).to.respondTo('process');
  });

  it('throws an exception when the processor type is invalid', function () {
    var fn = function () {
      return new NextPayments('');
    };

    expect(fn).to.throw(Error);
  });

  it('returns conekta processor class', function () {
    var sub = new NextPayments('ConektaCard');

    expect(sub.processor).to.be.an.instanceof(ConektaCard);
  });
});
