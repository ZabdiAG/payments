export default class Response {
  constructor(params = {}) {
    this.errors = this._initErrors(params.errors);
    this.response = params.response || {};
  }

  _initErrors(errors) {
    if (!errors) {
      return null;
    }

    if (errors.isJoi) {
      return this._mapJoiErrors(errors);
    }

    return this._defaultError();
  }

  _defaultError() {
    return {
      name: 'ProviderError',
      message: 'There was an error processing the card.'
    };
  }

  _mapJoiErrors(errors) {
    var messages = errors.details.map(err => {
      return {[err.path]: [err.message]};
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
}
