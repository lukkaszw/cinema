import selectors from './selectors';

import { mockedData } from '../testUtils/mockedData';

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
      expect(selectors.getIsFetching(mockedState)).toBe(false);

      const stateWhenFetching = {
        show: {
          ...mockedState.show,
          loadingData: {
            isActive: true,
            isError: false,
          },
        }
      };

      expect(selectors.getIsFetching(stateWhenFetching)).toBe(true);
    });
  });

  describe('getIsError selector', () => {
    it('returns proper error state', () => {
      expect(selectors.getIsError(mockedState)).toBe(false);

      const stateWhenError = {
        show: {
          ...mockedState.show,
          loadingData: {
            isActive: false,
            isError: true,
          },
        },
      };

      expect(selectors.getIsError(stateWhenError)).toBe(true);
    });
  });

  describe('getData selector', () => {
    it('returns proper data', () => {
      expect(selectors.getData(mockedState)).toEqual(mockedData);
    });
  });
});