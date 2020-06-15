import selectors from './selectors';

const mockedState = {
  schedule: {
    data: [],
    loading: {
      isActive: false,
      isError: false,
    },
    filters: {
      page: 1,
      searchText: '',
    },
  },
};

const mockedData = [
  {
    _id: '1',
    title: 'Title One',
    categories: ['Comedy'],
    scheduleImg: 'image-1.jpg',
    details: {
      rating: 1.1,
    },
    filters: ['2d'],
    shows: [{
      _id: '1111',
    }],
    duration: 100,
  },
  {
    _id: '2',
    title: 'Title Two',
    categories: ['Drama'],
    scheduleImg: 'image-2.jpg',
    details: {
      rating: 2.5,
    },
    filters: ['2d', '3d'],
    shows: [{
      _id: '2222',
    }],
    duration: 120,
  },
];


describe('Schedule Reducer selectors', () => {
  describe('getScheduleList selector', () => {
    const expectedData = [
      {
        _id: '1',
        title: 'Title One',
        categories: ['Comedy'],
        img: 'image-1.jpg',
        rate: 1.1,
        filters: ['2d'],
        shows: [{
          _id: '1111',
        }],
        duration: 100,
      },
      {
        _id: '2',
        title: 'Title Two',
        categories: ['Drama'],
        img: 'image-2.jpg',
        rate: 2.5,
        filters: ['2d', '3d'],
        shows: [{
          _id: '2222',
        }],
        duration: 120,
      },
    ]

    afterEach(() => {
      mockedState.schedule.data = [];
      mockedState.schedule.filters.searchText = '';
    });

    it('returns empty array when data is empty array', () => {
      expect(selectors.getScheduleList(mockedState)).toEqual([]);
    });

    it('returns proper data when searchText is not provided', () => {
      mockedState.schedule.data = mockedData;
      expect(selectors.getScheduleList(mockedState)).toEqual(expectedData);
    });

    it('returns proper data when searchText is provided', () => {
      mockedState.schedule.data = mockedData;
      mockedState.schedule.filters.searchText = 'title';
      expect(selectors.getScheduleList(mockedState)).toEqual(expectedData);
      mockedState.schedule.filters.searchText = 'one';
      expect(selectors.getScheduleList(mockedState)).toEqual([expectedData[0]]);
      mockedState.schedule.filters.searchText = 'two';
      expect(selectors.getScheduleList(mockedState)).toEqual([expectedData[1]]);
      mockedState.schedule.filters.searchText = 'abghscsa';
      expect(selectors.getScheduleList(mockedState)).toEqual([]);
    });
  });

  describe('getLoading selector', () => {
    it('returns false when loading in state is not active', () => {
      expect(selectors.getLoading(mockedState)).toBe(false);
    });

    it('returns true when loading in state is active', () => {
      const stateWhenLoading = {...mockedState};
      stateWhenLoading.schedule.loading.isActive = true;
      expect(selectors.getLoading(stateWhenLoading)).toBe(true);
    });
  });

  describe('getError selector', () => {
    it('returns false when error in schedule state is false', () => {
      expect(selectors.getError(mockedState)).toBe(false);
    });

    it('returns true when error in schedule state is true', () => {
      const stateWhenError = {...mockedState};
      stateWhenError.schedule.loading.isError = true;
      expect(selectors.getError(stateWhenError)).toBe(true);
    });
  });

  describe('getPage selector', () => {
    it('returns proper page nr', () => {
      expect(selectors.getPage(mockedState)).toBe(1);
      mockedState.schedule.filters.page = 5;
      expect(selectors.getPage(mockedState)).toBe(5);
    });
  });

  describe('getSearchText selector', () => {
    it('returns proper searchText', () => {
      expect(selectors.getSearchText(mockedState)).toBe('');
      mockedState.schedule.filters.searchText = 'dummy search text';
      expect(selectors.getSearchText(mockedState)).toBe('dummy search text');
    });
  });
});