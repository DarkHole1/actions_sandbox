import CUserAPI from 'Core/Users/CUserAPI.js';
import CBasicUser from 'Core/Users/CBasicUser.js';
import CEmptyUser from 'Core/Users/CEmptyUser.js';
import { HTTP } from '__tests__/Mocks/HTTP.js';

describe('Test user api object', () => {
  describe('hash()', () => {
    it('null equal to {}', () => {
      const api = new CUserAPI();
      expect(api.hash(null)).toBe(api.hash({}));
    });

    it('not equal if different', () => {
      const api = new CUserAPI();
      expect(api.hash({a: '1'})).not.toBe(api.hash({a: '2'}));
    });
  });

  describe('process()', () => {
    it('return CEmptyUser', () => {
      const api = new CUserAPI();
      const res = api.process(null);
      expect(res).toBeInstanceOf(CEmptyUser);
      expect(res.isLogged()).toBe(false);
    });

    it('return old user if not changed', () => {
      const api = new CUserAPI();
      const userA = api.process({UserName: "name"});
      const userB = api.process({UserName: "name"}, userA);
      expect(userB).toBe(userA);
    });

    it('return new object if changed', () => {
      const api = new CUserAPI();
      const userA = api.process({data: {UserName: "name"}});
      const userB = api.process({data: {UserName: "new name"}}, userA);
      expect(userB).not.toBe(userA);
    });

    it('return CEmptyUser if old was null', () => {
      const api = new CUserAPI();
      const user = api.process(null);
      expect(user).toBeInstanceOf(CEmptyUser);
    });

    it('return CEmptyUser if old was CBasicUser', () => {
      const api = new CUserAPI();
      const userA = api.process({UserName: "name"});
      const user = api.process({}, userA);
      expect(user).toBeInstanceOf(CEmptyUser);
    });
  });

  describe('login', () => {
    it('call login api', async () => {
      const http = HTTP
        .get('users/init.php', {login: 'login', password: 'password'})
        .Return(null);
      const api = new CUserAPI({ http });
      await api.login('login', 'password');

      expect(http.called).toBe(true);
    });

    it('return CEmptyUser on error', async () => {
      const api = new CUserAPI({ http: HTTP.Reject('test') });
      const res = await api.login('login', 'password');
      expect(res).toBeInstanceOf(CEmptyUser);
    });

    it('return CBasicUser', async () => {
      const api = new CUserAPI({ http: HTTP.Return({data: {UserName: "name"}}) });
      const res = await api.login('login', 'password');
      expect(res).toBeInstanceOf(CBasicUser);
    });
  });

  describe('ping', () => {
    it('call api', async () => {
      const http = HTTP.get('users/ping.php').Return(null);
      const api = new CUserAPI({ http });
      await api.ping();
      expect(http.called).toBe(true);
    });

    it('same user', async () => {
      const api = new CUserAPI({ http: HTTP.Return({data: {UserName: 'Test'}}) });
      const userA = api.process({UserName: 'Test'});
      const res = await api.ping(userA);
      expect(res).toEqual(userA);
    });

    it('changed user', async () => {
      const api = new CUserAPI({ http: HTTP.Return({data: {UserName: 'new name'}}) });
      const userA = api.process({UserName: 'Test'});
      const res = await api.ping(userA);
      expect(res).not.toEqual(userA);
    });
  });

  describe('logout', () => {
    it('basic', async () => {
      const http = HTTP.get('users/logout.php').Return({data: {}});
      const api = new CUserAPI({ http });
      const res = await api.logout();
      expect(res).toBeInstanceOf(CEmptyUser);
      expect(http.called).toBe(true);
    });
  });
});
