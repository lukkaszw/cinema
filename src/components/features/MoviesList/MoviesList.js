import React from 'react';
import MovieListItem from '../../common/MovieListItem/MovieListItem';
import PropTypes from 'prop-types';
import styles from './MoviesList.module.scss';

const MoviesList = ({ movies }) => {
  return ( 
    <div className={styles.root}>
      <ul className={styles.list}>
        {
          movies.map(movie => (
            <MovieListItem key={movie._id} {...movie} />
          ))
        }
      </ul>
    </div>
   );
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};
 
export default MoviesList;