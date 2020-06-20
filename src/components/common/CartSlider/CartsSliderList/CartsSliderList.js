import React, { useMemo } from 'react';
import Cart from '../../Cart/Cart';
import PropTypes from 'prop-types';
import styles from './CartsSliderList.module.scss';
import clsx from 'clsx';

const CartsSliderList = ({ activeCart, carts, cartWidth,  }) => {
  const fourthFirstCarts = useMemo(() => carts.slice(0, 4), [carts]);

  return ( 
    <ul 
      className={styles.root}
      style={{ transform: `translateX(${-100 * activeCart/(carts.length + 4)}%)`}}
    >
      {
        carts.map((cartData, index) => (
          <li 
            key={cartData._id}
            style={{ width: `${cartWidth}px`}}
            className={clsx([styles.cartWrapper, activeCart === index && styles.active ])}
          >
            <Cart {...cartData} />
          </li>
        ))
      }
      {
        fourthFirstCarts.map((cartData, index) => (
          <li 
            key={`B-${cartData._id}`}
            style={{ width: `${cartWidth}px`}}
            className={clsx([styles.cartWrapper, activeCart === index && styles.active ])}
          >
            <Cart {...cartData} />
          </li>
        ))
      }
    </ul>
   );
}

CartsSliderList.propTypes = {
  carts: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeCart: PropTypes.number.isRequired,
  cartWidth: PropTypes.number.isRequired,
};

CartsSliderList.defaultProps = {
  carts: [],
};
 
export default CartsSliderList;