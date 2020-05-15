import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import CloseBtn from '../CloseBtn/CloseBtn';
import { ModalsPortal } from '../../layout/Portals/Portals';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import clsx from 'clsx';

const Modal = ({ renderPlace, position, closeAction, variant, children}) => (
  <ModalsPortal renderPlace={renderPlace}>
    <Backdrop 
      isActive={true} 
      closeAction={closeAction}
    />
    <div className={clsx([styles.root, position && styles[position]])}>
      <div className={clsx([styles.content, variant && styles[variant]])}>
        {children}
      </div>
      <CloseBtn 
        closeAction={closeAction}
      />
    </div>
  </ModalsPortal>
);

Modal.propTyps = {
  renderPlace: PropTypes.oneOf(['modals', 'modals-after-menu']),
  closeAction: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['dark', 'light']),
  position: PropTypes.oneOf(['top', 'high', 'center',]),
  children: PropTypes.node,
};

Modal.defaultProps = {
  renderPlace: 'modals',
  variant: 'light',
  position: 'center',
}
 
export default Modal;