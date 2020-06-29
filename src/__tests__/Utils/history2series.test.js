import { history2series } from 'Utils/history2series.js';

describe('Test history2series()', () => {
  it('Convert history to series', () => {
    expect(history2series(
      {
        '02.01.2000': {a: 10, b: 8},
        '01.01.2000': {a: 7, b: 2},
      }
    )).toEqual(
      [
        {
          label: 'a',
          data: [ ['01.01.2000', 7], ['02.01.2000', 10] ],
        },
        {
          label: 'b',
          data: [ ['01.01.2000', 2], ['02.01.2000', 8] ],
        },
      ]
    );
  });

  it('Sort by date', () => {
    expect(history2series(
      {
        '25.01.2000': {a: 4},
        '01.01.2000': {a: 1},
        '01.03.2000': {a: 3},
        '02.01.2000': {a: 2},
      }
    )[0].data).toEqual(
      [ ['01.01.2000', 1], ['02.01.2000', 2], ['25.01.2000', 4], ['01.03.2000', 3] ]
    );
  });
});
