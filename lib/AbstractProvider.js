import Promise from 'bluebird'
import Joi from 'Joi'
import Response from './conektaCard/response'

export default class AbstractProvider {
  constructor (params = {}) {
    this.params = params
    this.errors = []
  }

  process () {
    return Promise.try(() => {
      if (!this._isValid()) {
        throw new Response({errors: this.errors})
      }

      return this._purchase()
        .then(res => {
          return new Response({response: res})
        })
        .catch(err => {
          throw new Response({errors: err})
        })
    })
  }

  _schemaObj () {
    return null
  }

  _respObj () {
    return null
  }

  _isValid () {
    let res = this._validate()
    if (res.error) {
      this.errors = res.error
      return false
    }

    this.params = res.values
    return true
  }

  _validate () {
    if (!this._schemaObj()) {
      return console.log('Must define schema Joi object const')
    }

    return Joi.validate(this.params, this._schemaObj(), {stripUnknown: true})
  }

}
