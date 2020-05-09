import React, { Component } from 'react';
import Page from '../../layout/Page/Page';
import PropTypes from 'prop-types';
import styles from './Movies.module.scss';

class Movies extends Component {

  render() {
    const { isLoading, isError } = this.props; 

    return ( 
      <Page isFetching={isLoading} isFetchingError={isError} noHeader>
        <div className={styles.filters}>
          
        </div>
      </Page>
     );
  }
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Movies.defaultProps = {
  movies: [],
};
 
export default Movies;