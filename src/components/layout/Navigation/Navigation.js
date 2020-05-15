import React, { useState, useCallback } from 'react';
import SearchPanel from '../../features/SearchPanel/SearchPanel.container';
import MenuDesktop from '../MenuDesktop/MenuDesktop';
import MenuMobile from '../MenuMobile/MenuMobile';
import menuLinks from '../../../config/menuLinks';

const Navigation = () => {
  const [isSearchPanelOpen, setPanelStatus] = useState(false);

  const openSearchPanel = useCallback(() => setPanelStatus(true), [setPanelStatus]);
  const closeSearchPanel = useCallback(() => setPanelStatus(false), [setPanelStatus]);

  return ( 
    <nav>
      <MenuDesktop 
        openSearchPanel={openSearchPanel}
        links={menuLinks}
      />
      <MenuMobile 
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
 
export default Navigation;