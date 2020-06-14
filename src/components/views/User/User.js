import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Page from '../../layout/Page/Page';
import Container from '../../layout/Container/Container';
import UserNav from '../../layout/UserNav/UserNav';
import PropTypes from 'prop-types';
import UserNews from '../../features/UserNews/UserNews.container';
import UserSettings from '../../features/UserSettings/UserSettings.container';
import UpdatePswd from '../../features/UpdatePswd/UpdatePswd.container';
import UserOrders from '../../features/UserOrders/UserOrders.container';
import DeleteAccount from '../../features/DeleteAccount/DeleteAccount.container';

class User extends Component {

  componentDidMount() {
    const { token, fetchUserData} = this.props;
    fetchUserData(token);
  }

  render() {
    const { isFetching, isError } = this.props;


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
          <Route exact path='/user/settings' component={UserSettings} />
          <Route exact path='/user/settings/up' component={UpdatePswd} />
          <Route exact path='/user/settings/delete' component={DeleteAccount} />
        </Container>
      </Page>
    );
  }
}

User.propTypes = {
  token: PropTypes.string,
  fetchUserData: PropTypes.func.isRequired,
}
 
export default User;