'use strict';

var ConektaCard = require('./conektaCard');

var NextPayment = function (processorType, params) {
  params = params || {};
  this.processor = _initProcessor(processorType, params);
};

ConektaCard.prototype.process = function () {
  this.processor.process(function (res) {
    console.log(res);
  });
};

function _initProcessor(processorType, params) {
  switch (processorType) {
    case 'ConektaCard':
      var conektaCard = new ConektaCard(params);
      return conektaCard;
    default:
      throw new Error('Invalid Processor Type');
  }
}

module.exports = NextPayment;
