import Response from './response';

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

  _purchase(cb) {
    return cb(null, {});
  }

  _isValid() {
    return true;
  }
}
