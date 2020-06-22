import React from 'react';
import Screen from './Screen/Screen';
import Seats from '../Seats/Seats';
import IconButton from '../../common/IconButton/IconButton';
import { faLongArrowAltRight, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from './SeatsPanel.module.scss';
import useMobilePanel from './useMobilePanel';
import { PANEL } from './useMobilePanel';

const SeatsPanel = ({ seats, handleToggleSeat }) => {

  const {
    isMobile,
    goToLeft,
    goToRight,
    translateX,
    setXPos,
    setStartX,
    onSwipe,
  } = useMobilePanel();

  return ( 
    <div className={styles.root}>
      <div 
        className={styles.panel}
        onTouchStart={(e) => setStartX(e.touches[0].clientX)}
        onTouchMove={e => setXPos(e.touches[0].clientX)}
        onTouchEnd={onSwipe}
        style={{
          transform: `${isMobile ? `translateX(${translateX}%)` : 'translateX(-50%)'}`,
        }}
      >
        <Screen />
        <Seats 
          handleToggleSeat={handleToggleSeat}
          seats={seats}
        />
      </div>
      <div className={styles.rightLeftBtns}>
        <IconButton 
          action={goToLeft}
          disabled={translateX > PANEL.LEFT}
          icon={faLongArrowAltLeft}
          ariaLabel='go to left'
        />
        <IconButton 
          action={goToRight}
          icon={faLongArrowAltRight}
          disabled={translateX < PANEL.RIGHT}
          ariaLabel='go to right'
        />
      </div>
    </div>
   );
}

SeatsPanel.propTypes = {
  seats: PropTypes.array,
  handleToggleSeat: PropTypes.func.isRequired,
};
 
export default SeatsPanel;