'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _compropagoNode = require('compropago-node');

var _compropagoNode2 = _interopRequireDefault(_compropagoNode);

var _AbstractProvider2 = require('../AbstractProvider');

var _AbstractProvider3 = _interopRequireDefault(_AbstractProvider2);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var schema = _joi2.default.object({
  order_id: _joi2.default.string().required(),
  order_price: _joi2.default.number().precision(2).required(),
  order_name: _joi2.default.string().required(),
  customer_name: _joi2.default.string().required(),
  customer_email: _joi2.default.string().email().required(),
  payment_type: _joi2.default.string().required()
});

var ComproPago = function (_AbstractProvider) {
  _inherits(ComproPago, _AbstractProvider);

  function ComproPago() {
    _classCallCheck(this, ComproPago);

    return _possibleConstructorReturn(this, (ComproPago.__proto__ || Object.getPrototypeOf(ComproPago)).apply(this, arguments));
  }

  _createClass(ComproPago, [{
    key: '_purchase',
    value: function _purchase() {
      var _this2 = this;

      return new _bluebird2.default(function (resolve, reject) {
        _compropagoNode2.default.Charge.create(_this2.params).then(function (res) {
          resolve(res);
        }).catch(function (err) {
          reject(err);
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
  }], [{
    key: 'verifyPayment',
    value: function verifyPayment(id, amount) {
      return new _bluebird2.default(function (resolve, reject) {
        _compropagoNode2.default.Charge.find(id).then(function (res) {
          if (!res.data) {
            reject(res);
          }
          if (res.data.type === 'error') {
            reject(res.data);
          }
          var isSucced = res.data.type === 'charge.success';
          var isPaid = res.data.paid;
          var isCorrectAmount = res.data.amount === amount;
          resolve(isSucced && isPaid && isCorrectAmount);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }]);

  return ComproPago;
}(_AbstractProvider3.default);

exports.default = ComproPago;