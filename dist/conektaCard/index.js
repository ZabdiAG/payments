'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _conekta = require('conekta');

var _conekta2 = _interopRequireDefault(_conekta);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _AbstractProvider2 = require('../AbstractProvider');

var _AbstractProvider3 = _interopRequireDefault(_AbstractProvider2);

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_conekta2.default.api_key = process.env.CONEKTA_API_KEY || 'key_eYvWV7gSDkNYXsmr';
_conekta2.default.locale = 'es';

var schema = _joi2.default.object({
  card: _joi2.default.string().required(),
  amount: _joi2.default.number().required(),
  currency: _joi2.default.string().valid('mxn').required(),
  reference_id: _joi2.default.string().required(),
  details: _joi2.default.object().keys({
    name: _joi2.default.string().required(),
    email: _joi2.default.string().email().required(),
    phone: _joi2.default.string().required(),
    line_items: _joi2.default.array().items(_joi2.default.object().keys({
      name: _joi2.default.string().required(),
      description: _joi2.default.string().required(),
      unit_price: _joi2.default.number().required(),
      quantity: _joi2.default.number().required(),
      sku: _joi2.default.string().required(),
      category: _joi2.default.string().required()
    })).required()
  }).required()
});

var ConektaCard = function (_AbstractProvider) {
  _inherits(ConektaCard, _AbstractProvider);

  function ConektaCard() {
    _classCallCheck(this, ConektaCard);

    return _possibleConstructorReturn(this, (ConektaCard.__proto__ || Object.getPrototypeOf(ConektaCard)).apply(this, arguments));
  }

  _createClass(ConektaCard, [{
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
    key: '_schemaObj',
    value: function _schemaObj() {
      return schema;
    }
  }, {
    key: '_respObj',
    value: function _respObj(params) {
      return new _response2.default(params);
    }
  }]);

  return ConektaCard;
}(_AbstractProvider3.default);

exports.default = ConektaCard;