import React, { Component } from 'react';
import Loader from '../../common/Loader/Loader';
import CartSlider from '../../common/CartSlider/CartSlider';
import PropTypes from 'prop-types';
import styles from './ComingFilms.module.scss';

class ComingFilms extends Component {
  componentDidMount() {
    if(!this.props.movies || this.props.movies.length === 0) {
      this.props.fetchMovies();
    }
  }

  render() {
    const { isLoading, movies, isError } = this.props;

    return ( 
      <div className={styles.root}>
        {
          movies && movies.length > 0 &&
            <CartSlider 
              cartHeight={390}
              cartWidth={270}
              data={movies}
            />
        }
        {
         isLoading && 
          <div className={styles.loader}>
            <Loader classes={['red', 'small']}/>
          </div>
        }
        {
          !isLoading && (isError || movies.length === 0) &&
            <p className={styles.errorMessage}>
              No comming soon movies were found. Please come back later for more information.
            </p>
        }
      </div>
     );
  }
}

ComingFilms.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object),
  fetchMovies: PropTypes.func.isRequired,
};

ComingFilms.defaultProps = {
  movies: [],
}
 
export default ComingFilms;