import { CDate } from 'Utils/Date.js';

class CTasksAPI {
  constructor({ http } = {}) {
    if(!http) throw new Error('No HTTP.');
    this._http = http;
  }

  createTask(network, type, data) {
    if(data.date) {
      data.date = new CDate(data.date).asDottedString();
    }
    return this._http.get(`tasks/create/${network}/${type}.php`, data);
  }

  createVKTargeting(artist, track, description, date, coverage, coverageStories, coverageSubscribers) {
    return this.createTask(
      'vk', 'targeting',
      {artist, track, description, date, coverage, coverageStories, coverageSubscribers}
    );
  }

  createInstagramTargeting(artist, track, description, date, coverage, coverageStories) {
    return this.createTask(
      'instagram', 'targeting',
      {artist, track, description, date, coverage, coverageStories}
    );
  }

  createOKTargeting(artist, track, description, date, coverage) {
    return this.createTask(
      'ok', 'targeting',
      {artist, track, description, date, coverage}
    );
  }

  createTikTokTargeting(artist, track, description, date, coverage) {
    return this.createTask(
      'tiktok', 'targeting',
      {artist, track, description, date, coverage}
    );
  }

  createYouTubeTargeting(artist, track, description, date, views) {
    return this.createTask(
      'youtube', 'targeting',
      {artist, track, description, date, views}
    );
  }

  createYouTubeCrops(artist, track, description, date, coverage, subscribers) {
    return this.createTask(
      'youtube', 'crops',
      {artist, track, description, date, coverage, subscribers}
    );
  }

  createInstagramCrops(artist, track, description, date, coverage, coverageStories) {
    return this.createTask(
      'instagram', 'crops',
      {artist, track, description, date, coverage, coverageStories}
    );
  }

  createVKCrops(artist, track, description, date, coverage, coverageStories) {
    return this.createTask(
      'vk', 'crops',
      {artist, track, description, date, coverage, coverageStories}
    );
  }

  createTikTokCrops(artist, track, description, date, coverage, subscribers) {
    return this.createTask(
      'tiktok', 'crops',
      {artist, track, description, date, coverage, subscribers}
    );
  }

  createOKCrops(artist, track, description, date, coverage) {
    return this.createTask(
      'ok', 'crops',
      {artist, track, description, date, coverage}
    );
  }

  all() {
    return this._http
    .get('tasks/all.php')
    .then(x => x.data);
  }

  get(id) {
    return this._http
      .get('tasks/get.php', { id })
      .then(x => {
        x = x.data;
        x.date = new CDate(x.date);
        return x;
    });
  }

  update(id, changes) {
    return this._http.get('tasks/update.php', { id, changes });
  }
}

export default CTasksAPI;
