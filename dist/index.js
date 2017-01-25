'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conektaCard = require('./conektaCard');

var _conektaCard2 = _interopRequireDefault(_conektaCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NextPayments = function () {
  function NextPayments(processorType) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, NextPayments);

    this.params = params;
    this.processor = this._initProcessor(processorType, params);
  }

  _createClass(NextPayments, [{
    key: 'process',
    value: function process() {
      return this.processor.process();
    }
  }, {
    key: '_initProcessor',
    value: function _initProcessor(type, params) {
      var processor = void 0;

      switch (type) {
        case 'ConektaCard':
          processor = new _conektaCard2.default(params);
          break;
        default:
          throw new Error('InvalidProcessorType');
      }

      return processor;
    }
  }]);

  return NextPayments;
}();

exports.default = NextPayments;