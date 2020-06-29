import CUser from './CUser.js';

class CEmptyUser extends CUser {
  constructor(params = {}) {
    super(params);
  }

  isLogged() {
    return false;
  }

  login(login, password) {
    return this._api.login(login, password).then(this.ctx);
  }
}

export default CEmptyUser;
