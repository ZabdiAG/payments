import Promise from 'bluebird';
import Response from './response';
import Conekta from 'conekta';
conekta.api_key = 'key_eYvWV7gSDkNYXsmr'; // eslint-disable-line

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
    return true;
  }
}
