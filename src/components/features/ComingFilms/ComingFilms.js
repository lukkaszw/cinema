import React from 'react';
import LoaderIndicator from '../../common/LoaderIndicator/LoaderIndicator';
import CartSlider from '../../common/CartSlider/CartSlider';
import PropTypes from 'prop-types';
import styles from './ComingFilms.module.scss';

const ComingFilms = ({ isLoading, movies, isError }) => ( 
  <div className={styles.root}>
    <LoaderIndicator isActive={isLoading}/>
    {
      movies && movies.length > 0 &&
        <CartSlider 
          cartHeight={390}
          cartWidth={270}
          data={movies}
        />
    }
    {
      !isLoading && (isError || movies.length === 0) &&
        <p className={styles.errorMessage}>
          No comming soon movies were found. Please come back later for more information.
        </p>
    }
  </div>
);

ComingFilms.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object),
};

ComingFilms.defaultProps = {
  movies: [],
}
 
export default ComingFilms;