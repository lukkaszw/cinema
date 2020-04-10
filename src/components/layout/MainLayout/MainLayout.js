import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import menuLinks from '../../../config/menuLinks';

const MainLayout = ({ children }) => {
  return ( 
    <div>
      {children}
      <Header />
      <Footer 
        links={menuLinks}
      />
    </div>
   );
}
 
export default MainLayout;