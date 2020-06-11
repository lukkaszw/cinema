import React from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import Page from '../../layout/Page/Page';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './MovieSchedule.module.scss';

export const MovieSchedule = ({ isAuth, match }) => {
  const showId = match.params.id;
  return ( 
    <Page noHeader>
      {
        isAuth &&
          <Redirect to={`/order/${showId}`}/>
      }
      <div className={styles.root}>
        <div className={styles.btn}>
          <Link
            className={clsx([styles.link, styles.toAuth])}
            to={{
              pathname: "/auth",
              state: {
                from: showId,
              }
            }}
          >
            Sign in to order
          </Link>
        </div>
        <div className={styles.btn}>
          <Link 
            className={clsx([styles.link, styles.toOrder])}
            to={`/order/${showId}`}
          >
              Order without logging in
          </Link>
        </div>
      </div>
    </Page>
   );
}

MovieSchedule.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
};
 
export default withRouter(MovieSchedule);