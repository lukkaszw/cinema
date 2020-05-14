import sortByAlphabet from './sortByAlphabet';
import sortByAlpha from './sortByAlphabet';

const mockedData = [
  {
    title: 'Db',
  },
  {
    title: 'Ab'
  },
  {
    title: 'Z',
  },
  {
    title: 'Aa',
  },
]

const checkSort = (dataAfterSort, expectedOrder) => {
  dataAfterSort.forEach((data, i) => {
    expect(data.title === expectedOrder[i]).toBeTruthy();
  });
}

describe('sortByAlphabet function', () => {
  it('returns data in good order', () => {
    checkSort(sortByAlpha(mockedData, 'asc'), ['Aa', 'Ab', 'Db', 'Z']);
    checkSort(sortByAlpha(mockedData, 'desc'), ['Z', 'Db', 'Ab', 'Aa']);
  });
});