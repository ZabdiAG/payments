'use strict';

var ConektaCard = require('./conektaCard');

var NextPayments = function (processorType, params) {
  params = params || {};
  this.processor = _initProcessor(processorType, params);
};

NextPayments.prototype.process = function (cb) {
  this.processor.process(function (res) {
    cb(res);
  });
};

function _initProcessor(type, params) {
  var processor;

  switch (type) {
    case 'ConektaCard':
      processor = new ConektaCard(params);
      break;
    default:
      throw new Error('Invalid Processor Type');
  }

  return processor;
}

module.exports = NextPayments;
