import objectDiff from 'Utils/objectDiff.js';

describe('Test objectDiff', () => {
  it('Base test', () => {
    expect(objectDiff({}, {a: 1})).toEqual({a: 1});
  });

  it('Test ignore removing key', () => {
    expect(objectDiff({a: 1}, {})).toEqual({});
  });

  it('Test must ignore deep changes in structure', () => {
    expect(objectDiff({a: {b: 1, c: 2}}, {a: {b: 1}})).toEqual({a: {b: 1}});
  })
});
