import {
  startFetching,
  fetchError,
  fetchSucceded,
  setAllMoviesFilter,
  setCurrentMoviesFilter,
  setSearchText,
  setPage,
  setTimeFilter,
  setSortFilter,
  toggleGenre,
  resetAllMoviesFilters,
} from './moviesRedux';
import  {
  START_FETCHING,
  SET_ERROR,
  SET_DATA,
  SET_ALL_FILTER,
  SET_CURRENT_FILTER,
  SET_SEARCH_TEXT,
  SET_PAGE,
  SET_PLAY_TIME,
  SET_SORT,
  TOGGLE_GENRE,
  RESET_FILTERS,
} from './moviesRedux'; 

describe('Movies Reducer actions', () => {
  it('creates proper action for starting fetching data', () => {
    const expectedAction = {
      type: START_FETCHING,
    };
    expect(startFetching()).toEqual(expectedAction);
  });

  it('creates proper action when error is occured', () => {
    const expectedAction = {
      type: SET_ERROR,
    };
    expect(fetchError()).toEqual(expectedAction);
  });

  it('creates proper action when fetching is succeded', () => {
    const payloadData = [  {
        id: '1',
        title: 'Title test 1',
        duration: 120,
        categories: ['Action', 'Drama'],
        image: '/images/carts/image-test.jpg',
      },
      {
        id: '2',
        title: 'Title test 2',
        duration: 116,
        categories: ['Adventure'],
        image: '/images/carts/image-test2.jpg',
      },
    ];
    const expectedAction = {
      type: SET_DATA,
      payload: payloadData,
    };
    expect(fetchSucceded(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when all movies filter is updated', () => {
    const payloadData = '3d';

    const expectedAction = {
      type: SET_ALL_FILTER,
      payload: payloadData,
    }

    expect(setAllMoviesFilter(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when current movies filter is updated', () => {
    const payloadData = '2d';

    const expectedAction = {
      type: SET_CURRENT_FILTER,
      payload: payloadData,
    }

    expect(setCurrentMoviesFilter(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when user updates searchText', () => {
    const payloadData = 'test text';

    const expectedAction = {
      type: SET_SEARCH_TEXT,
      payload: payloadData,
    }

    expect(setSearchText(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when user set page', () => {
    const payloadData = 3;
    const expectedAction = {
      type: SET_PAGE,
      payload: 3,
    };

    expect(setPage(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when user set play time filter', () => {
    const payloadData = 'soon';
    const expectedAction = {
      type: SET_PLAY_TIME,
      payload: payloadData,
    };

    expect(setTimeFilter(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when user sortBy filter', () => {
    const payloadData = 'desc';
    const expectedAction = {
      type: SET_SORT,
      payload: payloadData,
    };
    expect(setSortFilter(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when toggleGenre is fired', () => {
    const payloadData = 'Comedy';
    const expectedAction = {
      type: TOGGLE_GENRE,
      payload: payloadData,
    };
    expect(toggleGenre(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when user wants to reset all filters', () => {
    const expectedAction = {
      type: RESET_FILTERS,
    };
    expect(resetAllMoviesFilters()).toEqual(expectedAction);
  });
});