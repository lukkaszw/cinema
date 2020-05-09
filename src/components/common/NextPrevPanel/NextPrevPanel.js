import React from 'react';
import IconButton from '../IconButton/IconButton';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from './NextPrevPanel.module.scss';

const NextPrevPanel = ({message, info, prevAction, nextAction, prevDisabled, nextDisabled }) => {
  return ( 
    <div className={styles.root}>
      <div className={styles.icon}>
        <IconButton 
          action={prevAction}
          icon={faChevronLeft}
          disabled={prevDisabled}
        />
      </div>
      {
        message &&
          <div className={styles.message}>
            <span>{message}</span>
            {
              info &&
              <span className={styles.info}>
                {info}
              </span>
            }
          </div>
      }
      <div className={styles.icon}>
        <IconButton 
          action={nextAction}
          icon={faChevronRight}
          disabled={nextDisabled}
        />
      </div>
    </div>
   );
}

NextPrevPanel.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prevAction: PropTypes.func.isRequired,
  nextAction: PropTypes.func.isRequired,
  prevDisabled: PropTypes.bool,
  nextDisabled: PropTypes.bool,
};
 
export default NextPrevPanel;