import sortByAlphabet from '../../../../utils/sortByAlphabet/sortByAlphabet';

const getAllMovies = ({ movies }) => {
  const { filter, searchText, playTime, sort, genres } = movies.filtersFor.all;

  let filteredMovies = movies.data;

  if(genres.length > 0) {
    filteredMovies = filteredMovies.filter(movie => movie.categories.some(element => genres.includes(element)));
  }

  if(playTime !== 'all') {
    filteredMovies = filteredMovies.filter(movie => movie.played === playTime);
  }

  if(filter !== 'all' && playTime !== 'soon') {
    filteredMovies = filteredMovies.filter(movie => {
      if(movie.filters) {
        return movie.filters.includes(filter);
      }
      return false;
    });
  }

  if(searchText) {
    filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(searchText));
  }

  return sortByAlphabet(filteredMovies, sort);
};
const checkIfDataFetched = ({ movies }) => movies.data.length > 0;
const getCurrentMovies = ({ movies }) => {
  const currentMovies = movies.data.filter(movie => movie.played === 'current');
  const crntFilter = movies.filtersFor.current;
  if(crntFilter === 'all') {
    return currentMovies;
  }
  return currentMovies.filter(movie => movie.filters.includes(crntFilter));
}
const getSoonMovies = ({ movies }) => movies.data.filter(movie => movie.played === 'soon');
const getIsLoading = ({ movies }) => movies.loading.isActive;
const getAllMoviesFilter = ({ movies }) => movies.filtersFor.all.filter;
const getCurrentMoviesFilter = ({ movies }) => movies.filtersFor.current;
const getPlayTimeFilter = ({ movies }) => movies.filtersFor.all.playTime;
const getIsError = ({ movies }) => movies.loading.isError;
const getSearchText = ({ movies }) => movies.filtersFor.all.searchText;
const getAllMoviesPage = ({ movies }) => movies.filtersFor.all.page;
const getSortFilter = ({ movies }) => movies.filtersFor.all.sort;
const getGenresFilter = ({ movies }) => movies.filtersFor.all.genres;

export default {
  getAllMovies,
  checkIfDataFetched,
  getCurrentMovies,
  getSoonMovies,
  getIsLoading,
  getAllMoviesFilter,
  getCurrentMoviesFilter,
  getPlayTimeFilter,
  getIsError,
  getSearchText,
  getAllMoviesPage,
  getSortFilter,
  getGenresFilter,
};