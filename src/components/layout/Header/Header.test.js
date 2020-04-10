import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

const component = shallow(<Header />);

describe('Header Component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes Navigation', () => {
    expect(component.find('Navigation').exists()).toBeTruthy();
  });

  it('includes Logo', () => {
    expect(component.find('Logo').exists()).toBeTruthy();
  });
});