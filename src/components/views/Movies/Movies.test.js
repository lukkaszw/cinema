import React from 'react';
import { shallow } from 'enzyme';
import Movies from './Movies';

describe('Movies Component', () => {
  it('renders without crashing', () => {
    const component = shallow(<Movies />);
    expect(component).toBeTruthy();
  });
});