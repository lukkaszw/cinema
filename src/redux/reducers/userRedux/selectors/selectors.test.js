import selectors from './selectors';

const mockedOrders = [
  'order1',
  'order2',
];

const mockedNews = [
  'news1',
  'news2',
];


const mockedData = {
  name: 'Somename',
  orders: mockedOrders,
  news: mockedNews,
}


const mockedState = {
  user: {
    data: mockedData,
    loading: {
      isActive: false,
      isError: false,
    },
  },
};

const mockedStateWhenLoading = {
  user: {
    data: {},
    loading: {
      isActive: true,
      isError: false,
    }
  }
}

const mockedStateWhenError = {
  user: {
    data: {},
    loading: {
      isActive: false,
      isError: true,
    }
  }
}

describe('User reducer - selectors', () => {
  describe('getIsLoading selector', () => {
    it('returns proper loading state', () => {
      expect(selectors.getIsLoading(mockedState)).toBe(false);
      expect(selectors.getIsLoading(mockedStateWhenError)).toBe(false);
      expect(selectors.getIsLoading(mockedStateWhenLoading)).toBe(true);
    });
  });

  describe('getIsError selector', () => {
    it('returns proper error state', () => {
      expect(selectors.getIsError(mockedState)).toBe(false);
      expect(selectors.getIsError(mockedStateWhenError)).toBe(true);
      expect(selectors.getIsError(mockedStateWhenLoading)).toBe(false);
    });
  });

  describe('getUserData selector', () => {
    it('returns proper data', () => {
      expect(selectors.getUserData(mockedState)).toEqual(mockedData);
      expect(selectors.getUserData(mockedStateWhenError)).toEqual({});
      expect(selectors.getUserData(mockedStateWhenLoading)).toEqual({});
    });
  });

  describe('getNews selector', () => {
    it('returns proper user news', () => {
      expect(selectors.getNews(mockedState)).toEqual(mockedNews);
    });
  });
});