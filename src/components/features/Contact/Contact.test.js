import React from 'react';
import { shallow } from 'enzyme';
import Contact from './Contact';

const component = shallow(<Contact />);

describe('Contact component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});