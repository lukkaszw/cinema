import {
  startFetching,
  fetchError,
  fetchSucceded,
  setAllMoviesFilter,
  setCurrentMoviesFilter,
} from './moviesRedux';
import  {
  START_FETCHING,
  SET_ERROR,
  SET_DATA,
  SET_ALL_FILTER,
  SET_CURRENT_FILTER,
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
});