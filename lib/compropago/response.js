import AbstractResponse from '../AbstractResponse'

export default class Response extends AbstractResponse {
  _defaultMsg () {
    return 'Hubo un error generando el pago'
  }

  _providerClass () {
    return 'ComproPago'
  }

  _afterInit (params) {
    this.response = params.response.data || {}
  }
}
