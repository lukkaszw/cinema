import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import CloseBtn from '../CloseBtn/CloseBtn';
import { ModalsPortal } from '../../layout/Portals/Portals';
import styles from './Modal.module.scss';

const Modal = ({ closeAction, children }) => (
  <ModalsPortal>
    <Backdrop 
      isActive={true} 
      closeAction={closeAction}
    />
    <div className={styles.root}>
      <div className={styles.content}>
        {children}
      </div>
      <CloseBtn 
        closeAction={closeAction}
      />
    </div>
  </ModalsPortal>
);
 
export default Modal;