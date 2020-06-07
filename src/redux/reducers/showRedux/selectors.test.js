import {
  getIsFetching,
  getIsError,
  getData,
} from './showRedux';

import { mockedData } from './mockedData';

const mockedState = {
  show: {
    data: mockedData,
    loadingData: {
      isActive: false,
      isError: false,
    },
  }
}

describe('showRedux selectors', () => {
  describe('getIsFetching selector', () => {
    it('returns proper fetching process state', () => {
      expect(getIsFetching(mockedState)).toBe(false);

      const stateWhenFetching = {
        show: {
          ...mockedState.show,
          loadingData: {
            isActive: true,
            isError: false,
          },
        }
      };

      expect(getIsFetching(stateWhenFetching)).toBe(true);
    });
  });

  describe('getIsError selector', () => {
    it('returns proper error state', () => {
      expect(getIsError(mockedState)).toBe(false);

      const stateWhenError = {
        show: {
          ...mockedState.show,
          loadingData: {
            isActive: false,
            isError: true,
          },
        },
      };

      expect(getIsError(stateWhenError)).toBe(true);
    });
  });

  describe('getData selector', () => {
    it('returns proper data', () => {
      expect(getData(mockedState)).toEqual(mockedData);
    });
  });
});