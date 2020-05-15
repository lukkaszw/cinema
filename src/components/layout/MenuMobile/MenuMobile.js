import React, { useState } from 'react';
import MenuBtn from '../MenuBtn/MenuBtn';
import PullOutMenu from '../PullOutMenu/PullOutMenu';
import { MenuPortal } from '../../layout/Portals/Portals';
import PropTypes from 'prop-types';

import menuLinks from '../../../config/menuLinks';

const MenuMobile = ({ openSearchPanel }) => {
  const [isOpen, changeIsOpen] = useState(false);

  return (
    <MenuPortal>
      <PullOutMenu 
        links={menuLinks}
        isActive={isOpen}
        closeAction={() => changeIsOpen(false)}
        openSearchPanel={openSearchPanel}
      />
      <MenuBtn 
        isActive={isOpen}
        toggleAction={() => changeIsOpen(prevIsOpen => !prevIsOpen)}
      />
    </MenuPortal>
  );
}

MenuMobile.propTypes = {
  openSearchPanel: PropTypes.func.isRequired,
};
 
export default MenuMobile;