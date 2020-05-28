import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './UserNavItem.module.scss';

const UserNavItem = ({ to, name, icon }) => {
  return ( 
    <li className={styles.root}>
      <NavLink 
        exact={name !== 'Settings'}
        className={styles.link}
        to={to}
        activeClassName={styles.active}
      >
        <span className={styles.name}>
          {name}
        </span>
        <FontAwesomeIcon
          icon={icon} 
        />
      </NavLink>
    </li>
   );
}

UserNavItem.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
}
 
export default UserNavItem;