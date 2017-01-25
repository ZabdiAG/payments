'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = function () {
  function Response() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Response);

    this.errors = this._initErrors(params.errors);
    this.response = params.response || {};
  }

  _createClass(Response, [{
    key: '_initErrors',
    value: function _initErrors(errors) {
      if (!errors) {
        return null;
      }

      if (errors.isJoi) {
        return this._mapJoiErrors(errors);
      }

      return this._defaultError();
    }
  }, {
    key: '_defaultError',
    value: function _defaultError() {
      return {
        name: 'ProviderError',
        message: 'There was an error processing the card.'
      };
    }
  }, {
    key: '_mapJoiErrors',
    value: function _mapJoiErrors(errors) {
      var messages = errors.details.map(function (err) {
        return _defineProperty({}, err.path, [err.message]);
      });

      return {
        name: 'ValidationError',
        message: 'The card is not valid',
        details: {
          context: 'ConektaCard',
          messages: messages
        }
      };
    }
  }]);

  return Response;
}();

exports.default = Response;