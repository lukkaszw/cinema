import {
  getOrderedSeats,
  getIsSeatsFetching,
  getIsSeatsError,
} from './seatsRedux';
import { mockedSeats } from './mockedData';

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
      expect(getOrderedSeats(mockedState)).toEqual(mockedSeats);
    });
  });

  describe('getIsSeatsFetching', () => {
    it('returns proper loading state', () => {
      expect(getIsSeatsFetching(mockedState)).toBe(false);
      const stateWhenFetching = {
        seats: {
          ...mockedState.seats,
          loading: {
            isActive: true,
            isError: false,
          },
        },
      };
      expect(getIsSeatsFetching(stateWhenFetching)).toBe(true);
    });
  });

  describe('getIsSeatsError', () => {
    it('returns proper error state', () => {
      expect(getIsSeatsError(mockedState)).toBe(false);
      const stateWhenError = {
        seats: {
          ...mockedState.seats,
          loading: {
            isActive: false,
            isError: true,
          },
        },
      };

      expect(getIsSeatsError(stateWhenError)).toBe(true);
    });
  });
});