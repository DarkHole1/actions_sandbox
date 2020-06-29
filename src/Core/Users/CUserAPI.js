import defaultHttp from '../defaultHttp.js';
import md5 from 'js-md5';
import CBasicUser from './CBasicUser.js';
import CEmptyUser from './CEmptyUser.js';

class CUserAPI {
  constructor({ http } = {}) {
    this._http = http || defaultHttp();
    this.EMPTY_RESPONSE = this.hash({});
  }

  hash(data) {
    if(null === data)
      data = {};
    return md5(JSON.stringify(data));
  }

  process(data, usr) {
    const oldHash = usr ? usr.hash() : null;
    const newHash = this.hash(data);

    if(newHash === oldHash) return usr;

    if(newHash === this.EMPTY_RESPONSE) {
      return new CEmptyUser({api: this, hash: newHash});
    }

    return new CBasicUser({ data, api: this, hash: newHash});
  }

  login(login, password) {
    return this._http
      .get('users/init.php', {login, password})
      .then(resp => this.process(resp.data))
      .catch(e => this.process(null));
  }

  ping(usr) {
    return this._http
      .get('users/ping.php')
      .then(resp => this.process(resp.data, usr))
      .catch(e => this.process(null, usr));
  }

  logout(usr) {
    return this._http
      .get('users/logout.php')
      .then(resp => this.process(resp.data, usr))
      .catch(e => this.process(null, usr));
  }

  get http() {
    return this._http;
  }
}

export default CUserAPI;
