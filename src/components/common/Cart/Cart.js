import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Cart.module.scss';

const Cart = ({ _id, image, title, duration, categories, played, playDate }) => {
  return ( 
    <Link
     className={styles.root}
     to={`/movies/${_id}`}
    >
      <img
        className={styles.image}
        src={image}
        alt={title}
      />
      <h3 className={styles.title}>
        {title}
      </h3>
      <p className={styles.descr}>
        {
          duration &&
          <span>{`${duration} min`} | </span>
        }
        <span>{`${categories.join(' ').toUpperCase()}`}</span> 
      </p>
      {
        played === 'soon' &&
          <div className={styles.dateBelt}>
            {
              !!playDate ? playDate : 'Coming soon!'
            }
          </div>
      }
    </Link>
   );
}

Cart.propTypes = {
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.number,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  played: PropTypes.string,
  playDate: PropTypes.string,
};
 
export default Cart;