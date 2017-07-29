export class MockResponse {

  constructor(public data = null) {}

  json() {
    return this.data || {};
  }
};
