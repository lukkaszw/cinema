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
};

const mockedPropsWithData = {
  currentMovies: [{}],
  soonMovies: [{}],
  filter: 'all',
  isLoading: false,
  isError: false,
  setFilter: () => console.log('set filter'),
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
});