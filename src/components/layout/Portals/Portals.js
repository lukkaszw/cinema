import { createPortal } from 'react-dom';

export const ModalsPortal = ({ children, renderPlace }) => createPortal(children, document.getElementById(renderPlace));

export const MenuPortal = ({ children }) => createPortal(children, document.getElementById('mobile-menu')); 