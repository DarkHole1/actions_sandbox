import CTasksAPI from 'Core/API/CTasksAPI.js';
import { CDate } from 'Utils/Date.js';

import { HTTP } from '__tests__/Mocks/HTTP.js';

describe('Test tasks api object', () => {
  describe('createVKTargeting()', () => {
    it('valid request', async () => {
      const [artist, track, description, date, coverage, coverageStories] = [
        'artist', 'track', 'description', new Date(2010, 11, 1), 'coverage', 'coverageStories'
      ];
      const http = HTTP.get(
        'tasks/create/vk/targeting.php',
        {artist, track, description, date: '01.12.2010', coverage, coverageStories}
      ).Return({ data: [] });

      const api = new CTasksAPI({ http });
      await api.createVKTargeting(artist, track, description, date, coverage, coverageStories);
      expect(http.called).toEqual(true);
    });
  });

  describe('all()', () => {
    it('valid request', async () => {
      const http = HTTP.get('tasks/all.php').Return({ data: ['data'] });
      const api = new CTasksAPI({ http });
      expect(await api.all()).toEqual(['data']);
    });
  });

  describe('get()', () => {
    it('convert date-field to object', async () => {
      const http = HTTP.get('tasks/get.php', {id: 1}).Return({ data: {date: '01.12.2010'} });
      const api = new CTasksAPI({ http });
      const res = await api.get(1);
      const date = res.date;
      expect(date).toBeInstanceOf(CDate);
      expect(date.asDottedString()).toBe('01.12.2010');
    });
  });

  describe('createTask()', () => {
    it('convert date-field to dd.mm.yyyy', async () => {
      const http = HTTP
        .get('tasks/create/A/B.php', {date: '01.12.2010'})
        .Return({ data: {} });

      const api = new CTasksAPI({ http });
      const res = await api.createTask('A', 'B', {date: new Date(2010, 11, 1)});
      expect(http.called).toEqual(true);
      expect(res).toEqual({ data: {} });
    });
  });
});
