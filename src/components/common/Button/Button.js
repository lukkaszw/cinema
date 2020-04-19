import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Button.module.scss';

const Button = ({ children, variants, action, disabled }) => {
  const classes = variants.map(variant => styles[variant]);
  

  return ( 
    <button 
      onClick={action}
      className={clsx([styles.root, classes])}
      disabled={disabled}
    >
      {children}
    </button>
   );
}

Button.propTypes = {
  children: PropTypes.node,
  variants: PropTypes.arrayOf(PropTypes.string),
  action: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  variants: [],
}
 
export default Button;