import React from 'react';
import Checkbox from '../../common/Checkbox/Checkbox';
import PropTypes from 'prop-types';
import styles from './CheckboxesList.module.scss';

const CheckboxesList = ({ items, values, toggleAction }) => {
  return ( 
    <ul className={styles.root}>
      {
        items.map(item => (
          <li
            className={styles.listItem} 
            key={item.value}
          >
            <Checkbox 
              value={item.value}
              text={item.text}
              checked={values.includes(item.value)}
              toggleAction={toggleAction}
            />
          </li>
        ))
      }
    </ul>
   );
}

CheckboxesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleAction: PropTypes.func.isRequired,
};

CheckboxesList.defaultProps = {
  values: [],
}
 
export default CheckboxesList;