export default class Response {
  constructor(params = {}) {
    this.success = params.success;
    this.params = params;
    this.errors = {};
    this.raw = {};
  }
}
