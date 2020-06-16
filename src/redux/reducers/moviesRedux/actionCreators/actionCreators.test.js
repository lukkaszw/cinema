import actionCreators from './actionCreators';
import actions from '../actions/actions'; 

describe('Movies Reducer actions', () => {
  it('creates proper action for starting fetching data', () => {
    const expectedAction = {
      type: actions.START_FETCHING,
    };
    expect(actionCreators.startFetching()).toEqual(expectedAction);
  });

  it('creates proper action when error is occured', () => {
    const expectedAction = {
      type: actions.SET_FETCH_ERROR,
    };
    expect(actionCreators.fetchError()).toEqual(expectedAction);
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
      type: actions.SET_FETCH_DATA,
      payload: payloadData,
    };
    expect(actionCreators.fetchSucceded(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when all movies filter is updated', () => {
    const payloadData = '3d';

    const expectedAction = {
      type: actions.SET_ALL_FILTER,
      payload: payloadData,
    }

    expect(actionCreators.setAllMoviesFilter(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when current movies filter is updated', () => {
    const payloadData = '2d';

    const expectedAction = {
      type: actions.SET_CURRENT_FILTER,
      payload: payloadData,
    }

    expect(actionCreators.setCurrentMoviesFilter(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when user updates searchText', () => {
    const payloadData = 'test text';

    const expectedAction = {
      type: actions.SET_SEARCH_TEXT,
      payload: payloadData,
    }

    expect(actionCreators.setSearchText(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when user set page', () => {
    const payloadData = 3;
    const expectedAction = {
      type: actions.SET_PAGE,
      payload: 3,
    };

    expect(actionCreators.setPage(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when user set play time filter', () => {
    const payloadData = 'soon';
    const expectedAction = {
      type: actions.SET_PLAY_TIME,
      payload: payloadData,
    };

    expect(actionCreators.setTimeFilter(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when user sortBy filter', () => {
    const payloadData = 'desc';
    const expectedAction = {
      type: actions.SET_SORT,
      payload: payloadData,
    };
    expect(actionCreators.setSortFilter(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when toggleGenre is fired', () => {
    const payloadData = 'Comedy';
    const expectedAction = {
      type: actions.TOGGLE_GENRE,
      payload: payloadData,
    };
    expect(actionCreators.toggleGenre(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when user wants to reset all filters', () => {
    const expectedAction = {
      type: actions.RESET_FILTERS,
    };
    expect(actionCreators.resetAllMoviesFilters()).toEqual(expectedAction);
  });
});