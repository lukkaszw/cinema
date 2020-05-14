import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

const mockedProps = {
  currentMovies: [],
  soonMovies: [],
  filter: 'all',
  isLoading: false,
  isError: false,
  fetchMovies: () => console.log('fetch movies'),
  setFilter: () => console.log('set filter'),
  dataFetched: false,
};

const mockedPropsWithData = {
  currentMovies: [{
    _id: '1',
    title: 'Movie 1',
  }],
  soonMovies: [{
    _id: '2',
    title: 'Movie 2',
  }],
  filter: 'all',
  isLoading: false,
  isError: false,
  setFilter: () => console.log('set filter'),
  dataFetched: true,
}

const component = shallow(<Home {...mockedProps} />);

describe('Home Component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes EntryPanel', () => {
    expect(component.find('EntryPanel').exists()).toBeTruthy();
  });

  it('uses fetchMovies in ComponentDidMount only when movies data is not provided', () => {
    const testProps = {...mockedProps};
    const fetchMoviesFunc = jest.fn();
    testProps.fetchMovies = fetchMoviesFunc;

    const component = shallow(<Home {...testProps}/>);
    component.instance();
    expect(fetchMoviesFunc).toHaveBeenCalledTimes(1);

    const fetchMoviesFunc2 = jest.fn();
    const testPropsWithData = {...mockedPropsWithData};
    testPropsWithData.fetchMovies = fetchMoviesFunc2;
    const component2 = shallow(
      <Home 
        {...testPropsWithData}
      />
    );
    component2.instance();
    expect(fetchMoviesFunc2).toHaveBeenCalledTimes(0);
  });

  it('includes Two Section elements with title "CURRENTLY PLAYED" and "COMMING SOON"', () => {
    const sectionsEl = component.find('Section');
    expect(sectionsEl.length).toBe(2);
    expect(sectionsEl.at(0).prop('title')).toBe("CURRENTLY PLAYED");
    expect(sectionsEl.at(1).prop('title')).toBe("COMMING SOON");
  });

  it('includes CurrentFilms element with proper props', () => {
    const componetnWithData = shallow(<Home {...mockedPropsWithData} />);
    const crntFilmsEl = componetnWithData.find('CurrentFilms');
    expect(crntFilmsEl.exists()).toBeTruthy();
    expect(crntFilmsEl.props()).toEqual({
      movies: mockedPropsWithData.currentMovies,
      filter: mockedPropsWithData.filter,
      setFilter: mockedPropsWithData.setFilter,
      isError: mockedPropsWithData.isError,
      isLoading: mockedPropsWithData.isLoading,
    });
  });

  it('includes ComingFilms element with proper props', () => {
    const componetnWithData = shallow(<Home {...mockedPropsWithData} />);
    const comingFilmsEl = componetnWithData.find('ComingFilms');
    expect(comingFilmsEl.exists()).toBeTruthy();
    expect(comingFilmsEl.props()).toEqual({
      movies: mockedPropsWithData.soonMovies,
      isError: mockedPropsWithData.isError,
      isLoading: mockedPropsWithData.isLoading,
    });
  });
});