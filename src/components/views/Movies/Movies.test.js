import React from 'react';
import { mount } from 'enzyme';
import Movies from './Movies';

const mockedProps = {
  movies: [],
  isLoading: false,
  isError: false,
};

const component = mount(<Movies {...mockedProps}/>);

describe('Movies Component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes page', () => {
    expect(component.find('Page').exists()).toBeTruthy();
  });

  it('includes filters', () => {
    const filtersEl = component.find('.filters');
    expect(filtersEl.exists()).toBeTruthy();
  });
});