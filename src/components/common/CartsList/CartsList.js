import React from 'react';
import Cart from '../Cart/Cart';
import PropTypes from 'prop-types';
import styles from './CartsList.module.scss';

const CartsList = ({ movies }) => {
  return ( 
    <ul className={styles.root}>
      {
        movies.map(movie => (
          <li 
            key={movie._id}
            className={styles.item}
          >
            <Cart 
              {...movie}
            />
          </li>
        ))
      }
    </ul>
   );
};

CartsList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};
 
CartsList.defaultProps = {
  movies: [],
};

export default CartsList;