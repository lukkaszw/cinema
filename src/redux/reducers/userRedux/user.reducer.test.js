import userReducer from './user.reducer';
import actions from './actions/actions';

const mockedStatePart = {
  data: {},
  loading: {
    isActive: false,
    isError: false,
  },
};


describe('Movies Reducer', () => {
  it('returns the same state if action type is other than defined actions', () => {
    expect(userReducer(mockedStatePart, { type: null })).toBe(mockedStatePart);
    expect(userReducer(mockedStatePart, { type: undefined })).toBe(mockedStatePart);
    expect(userReducer(mockedStatePart, { type: ''})).toBe(mockedStatePart);
    expect(userReducer(mockedStatePart, { type: []})).toBe(mockedStatePart);
    expect(userReducer(mockedStatePart, { type: {}})).toBe(mockedStatePart);
    expect(userReducer(mockedStatePart, { type: 'TEST_ACTION'})).toBe(mockedStatePart);
  });

  it('returns proper state if action type was START_FETCHING', () => {
    //check if user reducer is clean function
    expect(userReducer(mockedStatePart, { type: actions.START_FETCHING })).not.toBe(mockedStatePart);

    expect(userReducer(mockedStatePart, { type: actions.START_FETCHING })).toEqual({
      data: {},
      loading: {
        isActive: true,
        isError: false,
      },
    });

  });

  it('returns proper state if action type was SET_DATA', () => {
    const payload = {
      name: 'Somename',
      surname: 'Somesurname',
      phone: 'Somephone',
      email: 'someemail@wp.pl',
    };
    //check if user reducer is clean function
    expect(userReducer(mockedStatePart, { type: actions.SET_FETCH_DATA, payload })).not.toBe(mockedStatePart);

    expect(userReducer(mockedStatePart, { type: actions.SET_FETCH_DATA, payload })).toEqual({
      data: payload,
      loading: {
        isActive: false,
        isError: false,
      },
    });
  });

  it('returns proper state when error occured - SET_ERROR', () => {
    //check if user reducer is clean function
    expect(userReducer(mockedStatePart, { type: actions.SET_FETCH_ERROR })).not.toBe(mockedStatePart);

    expect(userReducer(mockedStatePart, { type: actions.SET_FETCH_ERROR })).toEqual({
      data: {},
      loading: {
        isActive: false,
        isError: true,
      },
    });
  });

  it('properly updates news as read', () => {
    const mockedData = {
      name: 'Somename',
      news: [{ _id: '1', isRead: false }, { _id: '2', isRead: false }],
    };

    const mockedStatePartWithData = {
      data: mockedData,
      loading: {
        isActive: false,
        isError: false,
      },
    };

    const payload = '2';


     //check if user reducer is clean function
     expect(userReducer(mockedStatePartWithData, { type: actions.SET_NEWS_AS_READ, payload })).not.toBe(mockedStatePartWithData);

     expect(userReducer(mockedStatePartWithData, { type: actions.SET_NEWS_AS_READ, payload })).toEqual({
       data: {
        name: 'Somename',
        news: [{ _id: '1', isRead: false }, { _id: '2', isRead: true }]
      },
       loading: {
        isActive: false,
        isError: false,
      },
     });
  });
});