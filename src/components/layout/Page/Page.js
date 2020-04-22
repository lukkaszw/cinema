import React from 'react';
import Loader from '../../common/Loader/Loader';
import PropTypes from 'prop-types';
import styles from './Page.module.scss';

const Page = ({ isFetching, isFetchingError, children }) => {
  return ( 
    <main className={styles.root}>
      {
        isFetching &&
          <div className={styles.loader}>
            <Loader 
              classes={['red', 'small']}
            />
          </div>
      }
      {
        (!isFetching && !isFetchingError) &&
          <>
            {children}
          </> 
      }
      {
        /* place for error */
      }
    </main>
   );
}

Page.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};
 
export default Page;