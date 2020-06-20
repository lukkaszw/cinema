import React from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import styles from './NextPrevBtns.module.scss';

const NextPrevBtns = ({ goToNextStep, goToPrevStep, isInactivePrev, isInactiveNext }) => {
  return ( 
    <div className={styles.root}>
      <Button 
        variants={['small']}
        action={goToPrevStep}
        disabled={isInactivePrev}
      >
        Back
      </Button>
      <Button
        variants={['small']}
        action={goToNextStep}
        disabled={isInactiveNext}
      >
        Next
      </Button>
    </div>
   );
}

NextPrevBtns.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
  goToPrevStep: PropTypes.func.isRequired,
  isInactivePrev: PropTypes.bool.isRequired,
  isInactiveNext: PropTypes.bool.isRequired,
};
 
export default NextPrevBtns;