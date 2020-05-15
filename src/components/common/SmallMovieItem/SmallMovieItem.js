import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './SmallMovieItem.module.scss';
import clsx from 'clsx';

const SmallMovieItem = ({ _id, title, smallImg, played, closeAction }) => {
  return ( 
    <li className={styles.root}>
      <Link 
        className={styles.link}
        to={`/movies/${_id}`}
        onClick={closeAction}
      >
        <div className={styles.right}>
          <img
            className={styles.image} 
            src={smallImg} 
            alt={title} 
          />
          <h4 className={styles.title}>
            {title}
          </h4>
        </div>
        <p className={clsx([styles.played, played === 'soon' && styles.soon])}>
          { played === 'current' ? 'now' : 'soon'}
        </p>
      </Link>
    </li>
   );
}

SmallMovieItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  played: PropTypes.string.isRequired,
  smallImg: PropTypes.string.isRequired,
  closeAction: PropTypes.func.isRequired,
};
 
export default SmallMovieItem;