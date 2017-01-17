'use strict';

var expect = require('chai').expect;
var ConektaCard = require('../../lib/conektaCard');
var Response = require('../../lib/conektaCard');

describe('Constructor', function () {
  it('creates an instance of ConektaCard', function () {
    var conektaCard = new ConektaCard();
    expect(conektaCard).to.be.an.instanceof(ConektaCard);
  });
});

describe('#process', function () {
  it('throws response object', function () {
    var conektaCard = new ConektaCard();
    var cb = function () {
      console.log('here i am');
    };
    expect(conektaCard.process(cb)).to.be.an.instanceof(Response);
  });
});
