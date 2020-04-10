import React from 'react';
import MenuDesktop from '../MenuDesktop/MenuDesktop';
import MenuMobile from '../MenuMobile/MenuMobile';
import menuLinks from '../../../config/menuLinks';

const Navigation = () => {
  return ( 
    <nav>
      <MenuDesktop 
        links={menuLinks}
      />
      <MenuMobile />
    </nav>
   );
}
 
export default Navigation;