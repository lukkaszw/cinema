import React, { Component } from 'react';
import ScheduleList from '../../features/ScheduleList/ScheduleList';
import Pagination from '../../layout/Pagination/Pagination';
import PropTypes from 'prop-types';
import SearchInput from '../../common/SearchInput/SearchInput';
import SearchedByPanel from '../../common/SearchedByPanel/SearchedByPanel';
import SearchedByItem from '../../common/SearchedByItem/SearchedByItem';
import Container from '../../layout/Container/Container';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import Page from '../../layout/Page/Page';
import styles from './Schedule.module.scss';

class Schedule extends Component {

  LIMIT_ON_PAGE = 5;

  componentDidMount() {
    this.props.fetchSchedule();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.page !== this.props.page) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  onSubmit = (e) => e.preventDefault();

  resetSearchText = () => this.props.changeSearchText('');

  handleChangeSearchText = (e) => this.props.changeSearchText(e.target.value);

  getMoviesOnPage = () => {
    const page = this.props.page;
    const listOfItems = this.props.scheduleList;
    const lastItemOnPage = page * this.LIMIT_ON_PAGE;
    const firstItemOnPage = lastItemOnPage - this.LIMIT_ON_PAGE;
    return listOfItems.slice(firstItemOnPage, lastItemOnPage);
  }

  render() {
    const { isLoading, isError, scheduleList, page, setPage, searchText } = this.props;
    const { getMoviesOnPage, handleChangeSearchText, onSubmit, resetSearchText } = this;
    const movies = getMoviesOnPage();

    return ( 
      <Page isFetching={isLoading} isFetchingError={isError} noHeader>
        <Container>
          <div className={styles.filters}>
            <div className={styles.filter}>
              <SearchInput 
                placeholder="Search by title"
                onChange={handleChangeSearchText}
                value={searchText}
                onSubmit={onSubmit}
              />
            </div>
    
            {
              searchText &&
                <div className={styles.filter}>
                  <SearchedByPanel>
                    <SearchedByItem
                      value={searchText}
                      removeAction={resetSearchText}
                    />
                  </SearchedByPanel>
                </div>
            }
          </div>
          <ScheduleList 
            movies={movies}
          />
          {
            movies.length === 0 &&
              <ErrorMessage 
                message="No movies found!"
                action={resetSearchText}
                btnTitle="Cancel"
              />
          }
          <Pagination 
            currentPage={page}
            itemsPerPage={this.LIMIT_ON_PAGE}
            allItems={scheduleList.length}
            paginate={setPage}
          />
        </Container>
      </Page>
    );
  }
}

Schedule.propTypes = {
  fetchSchedule: PropTypes.func.isRequired,
  scheduleList: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  changeSearchText: PropTypes.func.isRequired,
};
 
export default Schedule;