import CUser from './CUser.js';
import CTasksAPI from 'Core/API/CTasksAPI.js';
import CInformationAPI from 'Core/API/CInformationAPI.js';

class CBasicUser extends CUser {
  constructor(params = {}) {
    super(params);
    const data = params.data || {};
    this.UserName = data.UserName || "";
    this._roles = Array.isArray(data.roles) ? data.roles : [];
  }

  isLogged() {
    return true;
  }

  logout() {
    return this._api.logout(this).then(this.ctx);;
  }

  is(roles) {
    roles = ('string' == typeof(roles)) ? [roles] : roles;

    for (const role of roles) {
      if(0 <= this._roles.indexOf(role))
        return true;
    }

    return false;
  }

  get Tasks() {
    return new CTasksAPI({ http: this._api.http });
  }

  get Information() {
    return new CInformationAPI({ http: this._api.http });
  }
}

export default CBasicUser;
