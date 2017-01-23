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
    return Promise.try(() => {
      if (!this._isValid()) {
        throw new Response({sucess: false, errors: this.errors});
      }

      return this._purchase((err, res) => {
        if (err) {
          throw new Response({sucess: false, raw: res});
        }

        return new Response({sucess: true, raw: res});
      });
    });
  }

  _purchase(cb) {
    return Conekta.Charge.create(this.params, cb);
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
