export default class Response {
  constructor(params = {}) {
    this.params = params;
    this.errors = params.errors || [];
    this.response = params.response || {};
  }
}
