import Promise from 'bluebird';
import Joi from 'Joi';
import Response from 'conektaCard/Response';
class AbstractProvider {
  constructor(params = {}) {
    this.params = params;
    this.errors = [];
  }

  process() {
    return Promise.try(() => {
      if (!this._isValid()) {
        throw new Response({errors: this.errors});
      }

      return this._purchase()
        .then(res => {
          return new Response({response: res});
        })
        .catch(err => {
          throw new Response({errors: err});
        });
    });
  }

  _purchase() {
    console.log('must implement this method');
    // returns Promise
  }

  _isValid() {
    let res = this._validate();
    if (res.error) {
      this.errors = res.error;
      return false;
    }

    this.params = res.values;
    return true;
  }

  _validate() {
    if (!schema) {
      return console.log('Must define schema Joi object const');
    }
    return Joi.validate(this.params, schema, {stripUnknown: true});
  }

}
