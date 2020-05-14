import { createPortal } from 'react-dom';

export const ModalsPortal = ({ children }) => createPortal(children, document.getElementById('modals'));

export const MenuPortal = ({ children }) => createPortal(children, document.getElementById('mobile-menu')); 

export const AfterMenuPortal =  ({ children }) => createPortal(children, document.getElementById('modals-after-menu')); 