import React from 'react';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../IconButton/IconButton';
import PropTypes from 'prop-types';
import styles from './CloseBtn.module.scss';

const CloseBtn = ({ closeAction }) => {
  return ( 
    <div className={styles.root}>
      <IconButton 
        icon={faWindowClose}
        action={closeAction}
      />
    </div>
   );
}

CloseBtn.propTypes = {
  closeAction: PropTypes.func.isRequired,
}
 
export default CloseBtn;