import {
  startFetching,
  fetchError,
  fetchSucceded,
  setFilter
} from './moviesRedux';
import  {
  START_FETCHING,
  SET_ERROR,
  SET_DATA,
  SET_FILTER,
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

  it('creates proper action when filters are updated', () => {
    const payloadData = '3d';

    const expectedAction = {
      type: SET_FILTER,
      payload: payloadData,
    }

    expect(setFilter(payloadData)).toEqual(expectedAction);
  });
});