import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


const Logout = ({ token, onLogout }) => {
  useEffect(() => {
    onLogout(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return ( 
    <Redirect to="/" />
   );
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};
 
export default Logout;