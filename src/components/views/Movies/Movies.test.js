import React from 'react';
import { mount, shallow } from 'enzyme';
import Movies from './Movies';

const mockedProps = {
  movies: [],
  isLoading: false,
  isError: false,
  fetchMovies: () => {},
  dataFetched: false,
};

const mockedPropsWithData = {
  movies: [{
    _id: '1',
    title: 'Title',
  }],
  isLoading: false,
  isError: false,
  fetchMovies: () => {},
  dataFetched: true,
};

const component = mount(<Movies {...mockedProps}/>);

describe('Movies Component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('fetches movies when mounted if movies have not been fetched', () => {
    const mockedFunc = jest.fn();
    const testProps = {...mockedProps};
    testProps.fetchMovies = mockedFunc;
    const componentWhithoutData= mount(<Movies {...testProps} />);
    componentWhithoutData.instance();
    expect(mockedFunc).toHaveBeenCalledTimes(1);
  });

  it('includes page', () => {
    expect(component.find('Page').exists()).toBeTruthy();
  });

  it('includes filters', () => {
    const filtersEl = component.find('.filters');
    expect(filtersEl.exists()).toBeTruthy();
  });
});