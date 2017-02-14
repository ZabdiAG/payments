'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractResponse2 = require('../AbstractResponse');

var _AbstractResponse3 = _interopRequireDefault(_AbstractResponse2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Response = function (_AbstractResponse) {
  _inherits(Response, _AbstractResponse);

  function Response() {
    _classCallCheck(this, Response);

    return _possibleConstructorReturn(this, (Response.__proto__ || Object.getPrototypeOf(Response)).apply(this, arguments));
  }

  _createClass(Response, [{
    key: '_defaultMsg',
    value: function _defaultMsg() {
      return 'Hubo un error generando el pago';
    }
  }, {
    key: '_providerClass',
    value: function _providerClass() {
      return 'ComproPago';
    }
  }, {
    key: '_afterInit',
    value: function _afterInit(params) {
      this.response = params.response.data || {};
    }
  }]);

  return Response;
}(_AbstractResponse3.default);

exports.default = Response;