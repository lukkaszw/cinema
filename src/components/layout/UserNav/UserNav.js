import React from 'react';
import UserNavItem from './UserNavItem/UserNavItem';
import styles from './UserNav.module.scss';
import navItems from './navItems';

const UserNav = () => {
  return ( 
    <ul className={styles.root}>
      {
        navItems.map(item => (
          <UserNavItem 
            key={item.name}
            {...item}
            icon={item.icon}
          />
        ))
      }
    </ul>
   );
}
 
export default UserNav;