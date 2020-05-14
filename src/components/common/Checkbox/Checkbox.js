import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Checkbox.module.scss';

const Checkbox = ({ value, checked, text, toggleAction }) => {
  const fireAction = useCallback(() => toggleAction(value), [toggleAction, value]);

  return ( 
    <div className={styles.root}>
      <input
        id={value}
        onChange={fireAction}
        type="checkbox" 
        checked={checked} 
      />
      <label htmlFor={value}>
        {text}
      </label>
    </div>
   );
}

Checkbox.propTypes = {
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  toggleAction: PropTypes.func.isRequired,
};
 
export default Checkbox;