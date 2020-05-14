import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import IconButton from '../IconButton/IconButton';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

const Modal = ({ closeAction, children }) => createPortal(
  <>
    <Backdrop 
      isActive={true} 
      closeAction={closeAction}
    />
    <div className={styles.root}>
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.closeBtn}>
        <IconButton 
          icon={faWindowClose}
          action={closeAction}
        />
      </div>
    </div>
  </>
  ,
  document.getElementById('modals')
);
 
export default Modal;