import React, { useState, useCallback } from 'react';
import SearchInput from '../../common/SearchInput/SearchInput';
import Modal from '../../common/Modal/Modal';
import SmallMoviesItemsList from '../../common/SmallMoviesItemsList/SmallMoviesItemsList';
import SearchedByPanel from '../../common/SearchedByPanel/SearchedByPanel';
import SearchedByItem from '../../common/SearchedByItem/SearchedByItem';
import Loader from '../../common/Loader/Loader';
import PropTypes from 'prop-types';
import styles from './SearchPanel.module.scss';
import clsx from 'clsx';

const SearchPanel = ({ closeAction, isLoading, resetQuery, isError, movies, searchMovies, query }) => {
  const [searchText, changeSearchText] = useState('');

  const changeInput = useCallback((e) => changeSearchText(e.target.value), [changeSearchText]);
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if(searchText) {
      searchMovies(searchText)
    }
  }, [searchMovies, searchText]);

  const message = isLoading ? null : 
    isError ? 'Error occured!!! Please try again later.' : 
    movies.length === 0 ? "No movies've been found! Try with another phrase!" :
    movies.length === 1 ? '1 movie has been found' :
    `${movies.length} movies've been found!`;
    
  return ( 
    <Modal 
      closeAction={closeAction}
      renderPlace='modals-after-menu'
      position="top"
      variant='dark'
    >
      <div className={styles.root}>
        <SearchInput 
          value={searchText}
          onChange={changeInput}
          onSubmit={onSubmit}
          placeholder="Search movie by title"
        />
        <div className={styles.searchedByPanel}>
          <SearchedByPanel>
            {
              query &&
                <SearchedByItem value={query} removeAction={resetQuery}/>
            }
          </SearchedByPanel>
        </div>
        {
          message && 
            <h4 className={clsx([styles.message, isError && styles.error])}>{message}</h4>
        }
        {
          isLoading && 
            <div className={styles.loader}>
              <Loader classes={['tiny', 'red']}/>
            </div>
        }
        <SmallMoviesItemsList 
          movies={movies} 
          closeAction={closeAction}
        />
      </div>
    </Modal>
   );
}

SearchPanel.propTypes = {
  closeAction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchMovies: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  resetQuery: PropTypes.func.isRequired,
};

SearchPanel.defaultProps = {
  movies: [],
};
 
export default SearchPanel;