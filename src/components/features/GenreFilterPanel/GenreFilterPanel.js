import React, { useState, useCallback } from 'react';
import GenreModal from './GenreModal/GenreModal';
import IconButton from '../../common/IconButton/IconButton';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from './GenreFilterPanel.module.scss';

const GenreFilterPanel = ({ activeGenres, toggleGenre, foundMoviesAmount }) => {
  const [isModalOpen, toggleOpening] = useState(false);
  const openAction = useCallback(() => toggleOpening(true), [toggleOpening]);
  const closeAction = useCallback(() => toggleOpening(false), [toggleOpening])

  return ( 
    <div className={styles.root}>
      <IconButton 
        icon={faFilm}
        action={openAction}
      />
      {
        isModalOpen &&
        <GenreModal 
          toggleAction={toggleGenre}
          values={activeGenres}
          closeModal={closeAction}
          foundMoviesAmount={foundMoviesAmount}
        />
      }
    </div>
   );
}

GenreFilterPanel.propTypes = {
  activeGenres: PropTypes.arrayOf(PropTypes.string),
  toggleGenre: PropTypes.func.isRequired,
  foundMoviesAmount: PropTypes.number.isRequired,
};

GenreFilterPanel.defaultProps = {
  activeGenres: [],
};
 
export default GenreFilterPanel;