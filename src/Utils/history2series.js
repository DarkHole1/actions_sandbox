import { CDate } from 'Utils/Date.js';

function history2series(history) {
  const resMap = {};
  for (const date in history) {
    const data = history[date];
    const dateObj = (new CDate(date)).asDate();

    for(const field in data) {
      if (!resMap[field]) {
        resMap[field] = [];
      }
      resMap[field].push([dateObj, data[field]]);
    }
  }

  return Object.keys(resMap).map(name => {
    const data = resMap[name];
    data.sort(function(a, b) {
      return a[0] - b[0];
    });
    return {
      label: name,
      data: data.map(([date, value]) => [ new CDate(date).asDottedString(), value])
    };
  });
}

export { history2series };
