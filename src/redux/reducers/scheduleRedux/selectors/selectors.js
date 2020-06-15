const getScheduleList = ({ schedule }) => {
  const searchText = schedule.filters.searchText;
  let movies = schedule.data;
  if(searchText) {
    movies = movies.filter(movie => movie.title.toLowerCase().includes(searchText.toLowerCase()));
  }

  return movies.map(movie => ({
    _id: movie._id,
    title: movie.title,
    categories: movie.categories,
    rate: movie.details.rating,
    img: movie.scheduleImg,
    filters: movie.filters,
    shows: movie.shows,
    duration: movie.duration,
  }));
}
const getLoading = ({ schedule }) => schedule.loading.isActive;
const getError = ({ schedule }) => schedule.loading.isError;
const getPage = ({ schedule }) => schedule.filters.page;
const getSearchText = ({ schedule }) => schedule.filters.searchText;

export default {
  getScheduleList,
  getLoading,
  getError,
  getPage,
  getSearchText,
};