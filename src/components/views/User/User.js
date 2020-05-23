import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Page from '../../layout/Page/Page';
import Container from '../../layout/Container/Container';
import UserNav from '../../layout/UserNav/UserNav';
import PropTypes from 'prop-types';
import UserNews from '../../features/UserNews/UserNews';
import UserSettings from '../../features/UserSettings/UserSettings';
import UserOrders from '../../features/UserOrders/UserOrders';
import isObjEmpty from '../../../utils/isObjEmpty/isObjEmpty';

class User extends Component {

  componentDidMount() {
    const { token, fetchUserData, data } = this.props;
    if(isObjEmpty(data)) {
      fetchUserData(token);
    }
  }

  render() {
    const { isFetching, isError  } = this.props;


    return ( 
      <Page
        isFetching={isFetching}
        isError={isError} 
        noHeader
      >
        <Container>
          <UserNav />
          <Route exact path='/user' component={UserNews} />
          <Route path='/user/orders' component={UserOrders} />
          <Route path='/user/settings' component={UserSettings} />
        </Container>
      </Page>
    );
  }
}

User.propTypes = {
  token: PropTypes.string,
  fetchUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}
 
export default User;