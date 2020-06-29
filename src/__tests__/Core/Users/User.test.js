import CUser from 'Core/Users/CUser.js';
import CBasicUser from 'Core/Users/CBasicUser.js';
import CEmptyUser from 'Core/Users/CEmptyUser.js';

describe('Test user object', () => {
  it('instantiate new user', () => {
    const user = new CBasicUser({data: {UserName: "name"}});
    expect(user.UserName).toBe('name');
  });

  describe('login', () => {
    it('set context if changed', async () => {
      let received = null;
      const api = {
        login: () => Promise.resolve('user')
      };
      const user = new CEmptyUser({api});
      user.ctx = o => { received = o; };

      await user.login('login', 'password');
      expect(received).toBe('user');
    });
  });

  describe('ping', () => {
    it('basic', async () => {
      let received = null;
      const api = {
        ping: (usr) => {
          expect(usr).not.toBe(undefined);
          return Promise.resolve('user');
        }
      };
      const user = new CUser({api});
      user.ctx = o => { received = o; };

      await user.ping();
      expect(received).toBe('user');
    });
  });
});
