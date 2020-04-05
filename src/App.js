import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/views/Home/Home';
import Schedule from './components/views/Schedule/Schedule';
import Movies from './components/views/Movies/Movies';
import Order from './components/views/Order/Order';
import Movie from './components/views/Movie/Movie';
import MovieSchedule from './components/views/MovieSchedule/MovieSchedule';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/movies/:id" component={Movie} />
        <Route exact path="/schedule" component={Schedule} />
        <Route exact path="/schedule/:id" component={MovieSchedule} />
        <Route exact path="/order/:id" component={Order} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
