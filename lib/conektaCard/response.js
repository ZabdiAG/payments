export default class Response {
  constructor (params = {}) {
    this.rawErrors = params.errors
    this.errors = this._initErrors(params.errors)
    this.response = params.response || {}
  }

  _initErrors (errors) {
    if (!errors) {
      return null
    }

    if (errors.isJoi) {
      return this._mapJoiErrors(errors)
    }

    return this._defaultError(errors)
  }

  _defaultError () {
    return {
      name: 'ProviderError',
      message: this._defaultMsg()
    }
  }

  _defaultMsg () {
    return this.rawErrors.message_to_purchaser || 'Hubo un error procesando la tarjeta'
  }

  _mapJoiErrors (errors) {
    var messages = errors.details.map(err => {
      return {[err.path]: [err.message]}
    })

    return {
      name: 'ValidationError',
      message: 'Hubo errores de validación',
      details: {
        context: this._providerClass(),
        messages: messages
      }
    }
  }

  _providerClass () {
    return 'ConektaCard'
  }
}
