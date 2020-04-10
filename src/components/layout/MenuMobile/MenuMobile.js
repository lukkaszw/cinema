import React, { useState } from 'react';
import MenuBtn from '../MenuBtn/MenuBtn';
import PullOutMenu from '../PullOutMenu/PullOutMenu';
import Backdrop from '../../common/Backdrop/Backdrop';
import styles from './MenuMobile.module.scss';

import menuLinks from '../../../config/menuLinks';

const MenuMobile = () => {
  const [isOpen, changeIsOpen] = useState(false);

  return ( 
    <div
      className={styles.root}
    >
      <PullOutMenu 
        links={menuLinks}
        isActive={isOpen}
        closeAction={() => changeIsOpen(false)}
      />
      <MenuBtn 
        isActive={isOpen}
        toggleAction={() => changeIsOpen(prevIsOpen => !prevIsOpen)}
      />
    </div>
   );
}
 
export default MenuMobile;