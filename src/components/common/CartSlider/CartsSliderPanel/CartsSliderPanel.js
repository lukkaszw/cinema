import React from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../../common/IconButton/IconButton';
import PropTypes from 'prop-types';
import styles from './CartsSliderPanel.module.scss';

export const CartsSliderPanel = ({ goToNextCart, goToPreviousCart, moviesAmount, isInactivePrev, isInactiveNext }) => {
  return ( 
    <div className={styles.root}>
      <IconButton 
        icon={faChevronLeft}
        disabled={isInactiveNext}
        action={goToNextCart}
        ariaLabel='Go to next cart'
      />
      <p>{`${moviesAmount} upcoming movies`}</p>
      <IconButton 
        icon={faChevronRight}
        disabled={isInactivePrev}
        action={goToPreviousCart}
        ariaLabel='Go to previous cart'
      />
    </div>
   );
}

CartsSliderPanel.propTypes = {
  goToNextCart: PropTypes.func.isRequired,
  goToPreviousCart: PropTypes.func.isRequired,
  moviesAmount: PropTypes.number.isRequired,
  isInactivePrev: PropTypes.bool.isRequired,
  isInactiveNext: PropTypes.bool.isRequired,
};
 
export default CartsSliderPanel;