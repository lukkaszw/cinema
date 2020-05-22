import React from 'react';
import Loader from '../../common/Loader/Loader';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Page.module.scss';

const Page = ({ isFetching, isFetchingError, noHeader, children }) => {
  return ( 
    <main className={clsx([styles.root, noHeader && styles.noHeader ])}>
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
  isFetching: PropTypes.bool,
  isFetchingError: PropTypes.bool,
  noHeader: PropTypes.bool,
};
 
export default Page;