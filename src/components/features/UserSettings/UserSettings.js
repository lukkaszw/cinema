import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserSettings extends Component {
  state = { 
    email: '',
    name: '',
    surname: '',
    phone: '',
    getsNewsletter: false,
  }

  render() { 
    return ( 
      <div>
        User settings
      </div>
     );
  }
}

UserSettings.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  surname: PropTypes.string,
  phone: PropTypes.string,
  getsNewsletter: PropTypes.bool,
};
 
export default UserSettings;