export default class AbstractResponse {
  constructor (params = {}) {
    this.rawErrors = params.errors
    this.errors = this._initErrors(params.errors)
    this.response = params.response || {}
    this._afterInit(params)
  }

  _afterInit (params) {
    return null
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
    throw new Error('Must implement defaultMgs method')
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
    throw new Error('Must implement providerClass method')
  }
}
