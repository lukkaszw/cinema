import React from 'react';
import SmallMovieItem from '../SmallMovieItem/SmallMovieItem';
import PropTypes from 'prop-types';
import styles from './SmallMoviesItemsList.module.scss';

const SmallMoviesItemsList = ({ movies, closeAction }) => {
  return ( 
    <ul className={styles.root}>
      {
        movies.map(movie => (
          <SmallMovieItem 
            key={movie._id}
            {...movie}
            closeAction={closeAction}
          />
        ))
      }
    </ul>
   );
}

SmallMoviesItemsList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};

SmallMoviesItemsList.defaultProps = {
  movies: [],
};
 
export default SmallMoviesItemsList;