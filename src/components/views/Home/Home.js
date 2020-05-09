import React, { Component } from 'react';
import EntryPanel from '../../layout/EntryPanel/EntryPanel';
import CurrentFilms from '../../features/CurrentFilms/CurrentFilms';
import ComingFilms from '../../features/ComingFilms/ComingFilms';
import Section from '../../layout/Section/Section';
import PropTypes from 'prop-types';

class Home extends Component {

  componentDidMount() {
    if(this.props.currentMovies.length === 0) {
      this.props.fetchMovies();
    }
  }

  render() {
    const { currentMovies, soonMovies, filter, isLoading, isError, setFilter  } = this.props;

    return (
      <div>
        <EntryPanel
          img="/images/entry.jpg"
          from="18 April"
          to="28 April"
          title="300 Rise of an empire"
          types={['2d', '3d']}
        />
        <Section 
          title="CURRENTLY PLAYED"
        >
          <CurrentFilms
            movies={currentMovies}
            isLoading={isLoading}
            filter={filter}
            setFilter={setFilter}
            isError={isError}
          />
        </Section>
        <Section 
          title="COMMING SOON"
        >
          <ComingFilms 
            movies={soonMovies}
            isLoading={isLoading}
            isError={isError}
          />
        </Section>
      </div>
    );
  }
}

Home.propTypes = {
  currentMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  soonMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default Home;