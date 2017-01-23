import Promise from 'bluebird';
import Response from './response';
import Conekta from 'conekta';
import Joi from 'joi';

Conekta.api_key = 'key_eYvWV7gSDkNYXsmr'; // eslint-disable-line

const schema = Joi.object({
  card: Joi.string().required(),
  amount: Joi.number(),
  currency: Joi.string().valid('mxn'),
  reference_id: Joi.string().required()
});

export default class ConektaCard {
  constructor(params = {}) {
    this.params = params;
    this.errors = [];
  }

  process() {
    let params = this.params;

    return Promise.try(() => {
      if (!this._isValid()) {
        throw new Response({errors: this.errors});
      }

      return this._purchase(params)
        .then(res => {
          return new Response({response: res});
        })
        .catch(err => {
          throw new Response({errors: err});
        });
    });
  }

  _purchase(params) {
    return new Promise((resolve, reject) => {
      Conekta.Charge.create(params, (err, res) => {
        if (err) {
          reject(err);
        }

        resolve(res);
      });
    });
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
    return Joi.validate(this.params, schema, {stripUnknown: true});
  }
}
