import Promise from 'bluebird'
import Joi from 'Joi'

export default class AbstractProvider {
  constructor (params = {}) {
    this.params = params
    this.errors = []
  }

  process () {
    return Promise.try(() => {
      if (!this._isValid()) {
        throw this._respObj({errors: this.errors})
      }

      return this._purchase()
        .then(res => {
          return this._respObj({response: res})
        })
        .catch(err => {
          throw this._respObj({errors: err})
        })
    })
  }

  _schemaObj () {
    return null
  }

  _respObj (params) {
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
      throw new Error('Must define schema Joi object const')
    }

    return Joi.validate(this.params, this._schemaObj(), {stripUnknown: true})
  }

}
