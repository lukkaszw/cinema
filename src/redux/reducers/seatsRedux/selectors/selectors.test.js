import selectors from './selectors';
import { mockedSeats } from '../testUtils/mockedData';

const mockedState = {
  seats: {
    data: mockedSeats,
    loading: {
      isActive: false,
      isError: false,
    },
  },
};

describe('Seats reducer selectors', () => {
  describe('getOrderedSeats', () => {
    it('returns proper data', () => {
      expect(selectors.getOrderedSeats(mockedState)).toEqual(mockedSeats);
    });
  });

  describe('getIsSeatsFetching', () => {
    it('returns proper loading state', () => {
      expect(selectors.getIsSeatsFetching(mockedState)).toBe(false);
      const stateWhenFetching = {
        seats: {
          ...mockedState.seats,
          loading: {
            isActive: true,
            isError: false,
          },
        },
      };
      expect(selectors.getIsSeatsFetching(stateWhenFetching)).toBe(true);
    });
  });

  describe('getIsSeatsError', () => {
    it('returns proper error state', () => {
      expect(selectors.getIsSeatsError(mockedState)).toBe(false);
      const stateWhenError = {
        seats: {
          ...mockedState.seats,
          loading: {
            isActive: false,
            isError: true,
          },
        },
      };

      expect(selectors.getIsSeatsError(stateWhenError)).toBe(true);
    });
  });
});