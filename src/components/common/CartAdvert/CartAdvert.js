import React from 'react';
import PropTypes from 'prop-types';
import styles from './CartAdvert.module.scss';


const CartAdvert = ({ image, title }) => {
  return (
    <div className={styles.root}>
      <img 
        className={styles.img} 
        src={image}
        alt={title}
      />
    </div>
  )
}

CartAdvert.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CartAdvert;