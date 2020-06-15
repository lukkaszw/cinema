const getOrderedSeats = ({ seats }) => seats.data;
const getIsSeatsFetching = ({ seats }) => seats.loading.isActive;
const getIsSeatsError = ({ seats }) => seats.loading.isError;

export default {
  getOrderedSeats,
  getIsSeatsFetching,
  getIsSeatsError,
};