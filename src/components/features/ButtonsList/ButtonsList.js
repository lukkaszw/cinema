import React from 'react';
import Button from '../../common/Button/Button';
import PropTypes from 'prop-types';
import styles from './ButtonsList.module.scss';

const ButtonsList = ({ buttons, action, value, variants }) => {
  return ( 
    <ul className={styles.root}>
      {
        buttons.map(button => (
          <li
            key={button.key}
            className={styles.btnItem}
          >
            <Button 
              action={() => action(button.value)}
              variants={[value === button.value ? null : 'gray', ...variants, 'notHovered']}
            >
              {button.title}
            </Button>
          </li>
        ))
      }
    </ul>
   );
}

ButtonsList.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.func.isRequired,
  variants: PropTypes.arrayOf(PropTypes.string),
};

ButtonsList.defaultProps = {
  variants: [],
}
 
export default ButtonsList;