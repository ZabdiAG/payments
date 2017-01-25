'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

var _conekta = require('conekta');

var _conekta2 = _interopRequireDefault(_conekta);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_conekta2.default.api_key = process.env.CONEKTA_API_KEY || 'key_eYvWV7gSDkNYXsmr'; // eslint-disable-line

var schema = _joi2.default.object({
  card: _joi2.default.string().required(),
  amount: _joi2.default.number().required(),
  currency: _joi2.default.string().valid('mxn').required(),
  reference_id: _joi2.default.string().required(), // eslint-disable-line
  details: _joi2.default.object().keys({
    name: _joi2.default.string().required(),
    email: _joi2.default.string().email().required(),
    phone: _joi2.default.string().required(),
    line_items: _joi2.default.array().items(_joi2.default.object().keys({ // eslint-disable-line
      name: _joi2.default.string().required(),
      description: _joi2.default.string().required(),
      unit_price: _joi2.default.number().required(), // eslint-disable-line
      quantity: _joi2.default.number().required(),
      sku: _joi2.default.string().required(),
      category: _joi2.default.string().required()
    })).required()
  }).required()
});

var ConektaCard = function () {
  function ConektaCard() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ConektaCard);

    this.params = params;
    this.errors = [];
  }

  _createClass(ConektaCard, [{
    key: 'process',
    value: function process() {
      var _this = this;

      var params = this.params;

      return _bluebird2.default.try(function () {
        if (!_this._isValid()) {
          throw new _response2.default({ errors: _this.errors });
        }

        return _this._purchase(params).then(function (res) {
          return new _response2.default({ response: res });
        }).catch(function (err) {
          throw new _response2.default({ errors: err });
        });
      });
    }
  }, {
    key: '_purchase',
    value: function _purchase(params) {
      return new _bluebird2.default(function (resolve, reject) {
        _conekta2.default.Charge.create(params, function (err, res) {
          if (err) {
            reject(err);
          }

          resolve(res);
        });
      });
    }
  }, {
    key: '_isValid',
    value: function _isValid() {
      var res = this._validate();
      if (res.error) {
        this.errors = res.error;
        return false;
      }

      this.params = res.values;
      return true;
    }
  }, {
    key: '_validate',
    value: function _validate() {
      return _joi2.default.validate(this.params, schema, { stripUnknown: true });
    }
  }]);

  return ConektaCard;
}();

exports.default = ConektaCard;