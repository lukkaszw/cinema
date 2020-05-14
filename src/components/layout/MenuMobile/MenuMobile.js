import React, { useState } from 'react';
import MenuBtn from '../MenuBtn/MenuBtn';
import PullOutMenu from '../PullOutMenu/PullOutMenu';
import Portal from './Portal';

import menuLinks from '../../../config/menuLinks';

const MenuMobile = () => {
  const [isOpen, changeIsOpen] = useState(false);

  return (
    <Portal>
      <PullOutMenu 
        links={menuLinks}
        isActive={isOpen}
        closeAction={() => changeIsOpen(false)}
      />
      <MenuBtn 
        isActive={isOpen}
        toggleAction={() => changeIsOpen(prevIsOpen => !prevIsOpen)}
      />
    </Portal>
  );
}
 
export default MenuMobile;