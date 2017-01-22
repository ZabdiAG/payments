import Response from './response';
import conekta from 'conekta';
conekta.api_key = 'key_eYvWV7gSDkNYXsmr'; // eslint-disable-line

export default class ConektaCard {
  constructor(params = {}) {
    this.params = params;
    this.errors = [];
  }

  process(cb) {
    var res;
    if (!this._isValid()) {
      res = new Response({
        errors: this.errors
      });

      return cb(res);
    }

    this._purchase((err, res) => {
      if (err) {
        res = new Response({
          errors: err
        });
      }

      res = new Response({
        response: res
      });

      return cb(res);
    });
  }

  _purchase(callback) {
    conekta.Charge.create(this.params, callback);
  }

  _isValid() {
    return true;
  }
}
