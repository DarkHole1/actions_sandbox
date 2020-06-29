import CBasicUser from 'Core/Users/CBasicUser.js';
import CTasksAPI from 'Core/API/CTasksAPI.js';

describe('Test basic user', () => {
  describe('is(role)', () => {
    it('contains role', () => {
      const usr = new CBasicUser({ data: { roles: ['test']} });
      expect(usr.is('test')).toBe(true);
    });

    it('dont contains role if not set roles', () => {
      const usr = new CBasicUser();
      expect(usr.is('test')).toBe(false);
    });

    it('dont contains role', () => {
      const usr = new CBasicUser({ data: { roles: ['test']} });
      expect(usr.is('another')).toBe(false);
    });

    it('any of role', () => {
      const usr = new CBasicUser({ data: { roles: ['test']} });
      expect(usr.is(['another', 'test'])).toBe(true);
    });

    it('roles as object', () => {
      const usr = new CBasicUser({ data: { roles: {}} });
      expect(usr.is('test')).toBe(false);
    });
  });

  describe('API\'s', () => {
    it('Tasks API', () => {
      const usr = new CBasicUser({ api: { http: {} } });
      expect(usr.Tasks).toBeInstanceOf(CTasksAPI);
    });
  });
});
