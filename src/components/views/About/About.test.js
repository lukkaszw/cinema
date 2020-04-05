import React from 'react';
import { shallow } from 'enzyme';
import About from './About';

describe('About Component', () => {
  it('renders without crashing', () => {
    const component = shallow(<About />);
    expect(component).toBeTruthy();
  });
});