class CUser {
  constructor({ hash, api } = {}) {
    this._api = api;
    this.hash = () => hash;
    this.ctx = x => x;
  }

  ping() {
    return this._api.ping(this).then(this.ctx);
  }
}

export default CUser;
