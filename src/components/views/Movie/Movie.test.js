import React from 'react';
import { shallow } from 'enzyme';
import Movie from './Movie';


describe('Movie Component', () => {
  it('renders without crashing', () => {
    const component = shallow(<Movie />);
    expect(component).toBeTruthy();
  });
});