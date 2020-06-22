import React, { useState, useCallback } from 'react';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../common/IconButton/IconButton';
import ButtonsList from '../../features/ButtonsList/ButtonsList';
import SearchInput from '../../common/SearchInput/SearchInput';
import SortPanel from '../../common/SortPanel/SortPanel';
import GenreFilterPanel from '../GenreFilterPanel/GenreFilterPanel';
import SearchedFilters from './SearchedFilters/SearchedFilters';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './FiltersPanel.module.scss';

import useSearchedItems from './useSearchedItems';

const FiltersPanel = ({ 
  inputText, 
  changeInput, 
  submitInput, 
  placeholder, 
  filtersBtns, 
  setFilter, 
  filter, 
  playTimeBtns, 
  setPlayTime, 
  playTime,
  sort,
  setSort,
  genres,
  toggleGenre,
  foundMoviesAmount }) => {

  const [isOpen, togglePanel] = useState(false);
  
  const togglePanelFc = useCallback(() => togglePanel(prevIsOpen => !prevIsOpen), [togglePanel]);

  const searchedItems = useSearchedItems({
    changeInput,
    setFilter,
    setPlayTime,
    toggleGenre,
  }, {
    inputText,
    playTime,
    filter,
    genres,
  });

  return ( 
    <div className={styles.root}>
      <div className={styles.top}>
        <SearchInput 
          value={inputText}
          onChange={changeInput}
          onSubmit={submitInput}
          placeholder={placeholder}
        />
        <div className={styles.filtersBtn}>
          <IconButton 
            icon={faFilter}
            action={togglePanelFc}
            ariaLabel='Toggle filters panel'
          />
        </div>
      </div>
      <div className={clsx([styles.center, isOpen && styles.active ])}>
        <div className={clsx([styles.filterBtns, playTime === 'soon' && styles.disabled])}>
          <p className={styles.filterName}>Technology (only played now movies):</p>
          <ButtonsList 
            buttons={filtersBtns}
            action={setFilter}
            value={filter}
            variants={['small']}
          />
        </div>
        <div className={styles.genrePanel}>
          <p className={styles.genre}>Genres:</p>
          <GenreFilterPanel 
            activeGenres={genres}
            toggleGenre={toggleGenre}
            foundMoviesAmount={foundMoviesAmount}
          />
        </div>
        <div className={styles.sortPanel}>
          <SortPanel 
            sort={sort}
            setSort={setSort}
          />
        </div>
        <div className={styles.playTimeFilters}>
          <p className={styles.filterName}>Movies played time:</p>
          <ButtonsList 
            buttons={playTimeBtns}
            action={setPlayTime}
            value={playTime}
            variants={['small', 'secondary']}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <SearchedFilters 
          items={searchedItems}
        />
      </div>
    </div>
   );
}

FiltersPanel.propTypes = {
  inputText: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
  submitInput: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  filtersBtns: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  playTimeBtns: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayTime: PropTypes.func.isRequired,
  playTime: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
  toggleGenre: PropTypes.func.isRequired,
  foundMoviesAmount: PropTypes.number.isRequired,
};
 
export default FiltersPanel;