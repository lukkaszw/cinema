import React from 'react';
import LoaderIndicator from '../../common/LoaderIndicator/LoaderIndicator';
import FetchError from '../../common/FetchError/FetchError';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Page.module.scss';

const Page = ({ isFetching, isFetchingError, noHeader, children }) => {
  return ( 
    <main className={clsx([styles.root, noHeader && styles.noHeader ])}>
      <LoaderIndicator isActive={isFetching} />
      {
        (!isFetching && !isFetchingError) &&
          <>
            {children}
          </> 
      }
      {
        isFetchingError &&
          <FetchError />
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