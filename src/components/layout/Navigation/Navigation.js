import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import SearchPanel from '../../features/SearchPanel/SearchPanel.container';
import MenuDesktop from '../MenuDesktop/MenuDesktop';
import MenuMobile from '../MenuMobile/MenuMobile';
import menuLinks from '../../../config/menuLinks';

const Navigation = ({ isAuth }) => {
  const [isSearchPanelOpen, setPanelStatus] = useState(false);

  const openSearchPanel = useCallback(() => setPanelStatus(true), [setPanelStatus]);
  const closeSearchPanel = useCallback(() => setPanelStatus(false), [setPanelStatus]);

  return ( 
    <nav>
      <MenuDesktop 
        isAuth={isAuth}
        openSearchPanel={openSearchPanel}
        links={menuLinks}
      />
      <MenuMobile 
        isAuth={isAuth}
        openSearchPanel={openSearchPanel}
      />
      {
        isSearchPanelOpen &&
          <SearchPanel 
            closeAction={closeSearchPanel}
          />
      }
    </nav>
   );
}

Navigation.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};
 
export default Navigation;