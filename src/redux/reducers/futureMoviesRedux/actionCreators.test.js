import {
  startFetching,
  fetchError,
  fetchSucceded,
} from './futureMoviesRedux';
import  {
  START_FETCHING,
  SET_ERROR,
  SET_DATA
} from './futureMoviesRedux'; 

describe('Movies Reducer actions', () => {
  it('create proper action for starting fetching data', () => {
    const expectedAction = {
      type: START_FETCHING,
    };
    expect(startFetching()).toEqual(expectedAction);
  });

  it('create proper action when error is occured', () => {
    const expectedAction = {
      type: SET_ERROR,
    };
    expect(fetchError()).toEqual(expectedAction);
  });

  it('create proper action when fetching is succeded', () => {
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
});