import userReducer from './userRedux';
import { 
  START_FETCHING,
  SET_DATA,
  SET_ERROR,
} from './userRedux';

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
    expect(userReducer(mockedStatePart, { type: START_FETCHING })).not.toBe(mockedStatePart);

    expect(userReducer(mockedStatePart, { type: START_FETCHING })).toEqual({
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
    expect(userReducer(mockedStatePart, { type: SET_DATA, payload })).not.toBe(mockedStatePart);

    //check if user reducer is clean function
    expect(userReducer(mockedStatePart, { type: SET_DATA, payload })).toEqual({
      data: payload,
      loading: {
        isActive: false,
        isError: false,
      },
    });
  });

  it('returns proper state when error occured - SET_ERROR', () => {
    //check if user reducer is clean function
    expect(userReducer(mockedStatePart, { type: SET_ERROR })).not.toBe(mockedStatePart);

    expect(userReducer(mockedStatePart, { type: SET_ERROR })).toEqual({
      data: {},
      loading: {
        isActive: false,
        isError: true,
      },
    });
  });
});