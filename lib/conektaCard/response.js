import AbstractResponse from '../AbstractResponse'

export default class Response extends AbstractResponse {
  _defaultMsg () {
    return this.rawErrors.message_to_purchaser || 'Hubo un error procesando la tarjeta'
  }

  _providerClass () {
    return 'ConektaCard'
  }
}
