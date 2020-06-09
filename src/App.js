import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/views/Home/Home.container';
import Schedule from './components/views/Schedule/Schedule.container';
import Movies from './components/views/Movies/Movies.container';
import Order from './components/views/Order/Order';
import About from './components/views/About/About';
import Logout from './components/views/Logout/Logout.container';
import Auth from './components/views/Auth/Auth.container';
import Movie from './components/views/Movie/Movie.container';
import MovieSchedule from './components/views/MovieSchedule/MovieSchedule.container';
import MainLayout from './components/layout/MainLayout/MainLayout';
import User from './components/views/User/User.container';
import AuthSuccess from './components/views/AuthSuccess/AuthSuccess';
import PropTypes from 'prop-types';

function App({ isAuth, onCheckStartAuth  }) {
  useEffect(() => {
    onCheckStartAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let routes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/movies" component={Movies} />
      <Route exact path="/movies/:id" component={Movie} />
      <Route exact path="/schedule" component={Schedule} />
      <Route exact path="/schedule/:id" component={MovieSchedule} />
      <Route exact path="/order/:id" component={Order} />
      <Route exact path="/about" component={About} />
      <Route exact path="/auth" component={Auth} />
      <Redirect to="/" />
    </Switch>
  )

  if(isAuth) {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/movies/:id" component={Movie} />
        <Route exact path="/schedule" component={Schedule} />
        <Route exact path="/schedule/:id" component={MovieSchedule} />
        <Route exact path="/order/:id" component={Order} />
        <Route path="/user" component={User} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/auth/success" component={AuthSuccess} />
        <Route exact path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <BrowserRouter>
      <MainLayout>
        {routes}
      </MainLayout>
    </BrowserRouter>
  );
}

App.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  onCheckStartAuth: PropTypes.func.isRequired,
};

export default App;
