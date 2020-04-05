import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

describe('Home Component', () => {
  it('renders without crashing', () => {
    const component = shallow(<Home />);
    expect(component).toBeTruthy();
  });
});