'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _Joi = require('Joi');

var _Joi2 = _interopRequireDefault(_Joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractProvider = function () {
  function AbstractProvider() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, AbstractProvider);

    this.params = params;
    this.errors = [];
  }

  _createClass(AbstractProvider, [{
    key: 'process',
    value: function process() {
      var _this = this;

      return _bluebird2.default.try(function () {
        if (!_this._isValid()) {
          throw _this._respObj({ errors: _this.errors });
        }

        return _this._purchase().then(function (res) {
          return _this._respObj({ response: res });
        }).catch(function (err) {
          throw _this._respObj({ errors: err });
        });
      });
    }
  }, {
    key: '_schemaObj',
    value: function _schemaObj() {
      throw new Error('Must implement schemaObj method');
    }
  }, {
    key: '_respObj',
    value: function _respObj(params) {
      throw new Error('Must implement respObj method');
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
      if (!this._schemaObj()) {
        throw new Error('Must define schema Joi object const');
      }

      return _Joi2.default.validate(this.params, this._schemaObj(), { stripUnknown: true });
    }
  }]);

  return AbstractProvider;
}();

exports.default = AbstractProvider;