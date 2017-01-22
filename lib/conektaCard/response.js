export default class Response {
  constructor(params = {}) {
    this.params = params;
    this.errors = {};
    this.response = {};
  }
}
