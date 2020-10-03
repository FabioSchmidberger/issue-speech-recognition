import matchToList from './matchToList';

describe('match To List', () => {
  it('equal elements should be matched', () => {
    const candidates = ['bug', 'Feature'];
    const value = 'bug';

    expect(value).toEqual(matchToList(value, candidates));
  });
  it('similar elements should be matched', () => {
    const candidates = ['bug', 'Feature'];
    const value = 'bag';

    expect('bug').toEqual(matchToList(value, candidates));
  });
});
