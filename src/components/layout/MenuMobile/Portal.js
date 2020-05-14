import { createPortal } from 'react-dom';

const Portal = ({ children }) => createPortal(children, document.getElementById('mobile-menu')); 

export default Portal;