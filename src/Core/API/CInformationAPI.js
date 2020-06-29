class CInformationAPI {
  constructor({ http } = {}) {
    if(!http) throw new Error('No HTTP.');
    this._http = http;
  }

  all() {
    return this._http
      .get('information/all.php')
      .then(x => x.data);
  }
}

export default CInformationAPI;
