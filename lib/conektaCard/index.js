'use strict';

var Response = require('./response');

var ConektaCard = function (params) {
  this.params = params || {};
  this.errors = [];
};

ConektaCard.prototype.process = function (cb) {
  var res;
  if (!this._isValid()) {
    res = new Response({
      errors: this.errors
    });

    return cb(res);
  }

  this._purchase(function (err, res) {
    if (err) {
      res = new Response({
        errors: err
      });
    }

    res = new Response({
      response: res
    });

    return cb(res);
  });
};

ConektaCard.prototype._purchase = function (cb) {
  return cb(null, {});
};

ConektaCard.prototype._isValid = function () {
  return true;
};

module.exports = ConektaCard;
