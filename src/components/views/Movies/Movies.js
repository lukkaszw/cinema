import React, { Component } from 'react';
import Container from '../../layout/Container/Container';
import Page from '../../layout/Page/Page';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import Pagination from '../../layout/Pagination/Pagination';
import MoviesList from '../../features/MoviesList/MoviesList';
import FiltersPanel from '../../features/FiltersPanel/FiltersPanel.movies.container';
import PropTypes from 'prop-types';

class Movies extends Component {

  LIMIT_ON_PAGE = 8;

  componentDidMount() {
    if(!this.props.dataFetched) {
      this.props.fetchMovies();
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.page !== this.props.page) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  toggleFilterPanel = () => {
    this.setState(prevState => ({
      isFiltersPanelOpen: !prevState.isFiltersPanelOpen,
    }));
  }

  resetFilters = () => {
    this.props.setFilter('all');
    this.props.setSearchText('');
  }

  getMoviesOnPage = () => {
    const page = this.props.page;
    const listOfItems = this.props.movies;
    const lastItemOnPage = page * this.LIMIT_ON_PAGE;
    const firstItemOnPage = lastItemOnPage - this.LIMIT_ON_PAGE;
    return listOfItems.slice(firstItemOnPage, lastItemOnPage);
  }

  render() {
    const { 
      isLoading, 
      isError, 
      setPage, 
      page, 
      movies, 
      resetFilters,
    } = this.props; 
    const { getMoviesOnPage } = this;
    const moviesOnScreen = getMoviesOnPage();

    return ( 
      <Page isFetching={isLoading} isFetchingError={isError} noHeader>
        <Container>
          <FiltersPanel 
            foundMoviesAmount={movies.length}
          />
          <MoviesList 
            movies={moviesOnScreen}
          />
          {
            moviesOnScreen.length === 0 &&
              <ErrorMessage 
                message="No movies found!"
                action={resetFilters}
                btnTitle="Cancel"
              />
          }
          <Pagination 
            currentPage={page}
            itemsPerPage={this.LIMIT_ON_PAGE}
            allItems={movies.length}
            paginate={setPage}
          />
        </Container>
      </Page>
     );
  }
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  fetchMovies: PropTypes.func.isRequired,
  dataFetched: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
};

Movies.defaultProps = {
  movies: [],
};
 
export default Movies;