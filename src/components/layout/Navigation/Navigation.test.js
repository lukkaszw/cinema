import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './Navigation';

const component = shallow(<Navigation />);

describe('Navigation component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes MenuDesktop', () => {
    expect(component.find('MenuDesktop').exists()).toBeTruthy();
  });

  it('includes MenuMobile', () => {
    expect(component.find('MenuMobile').exists()).toBeTruthy();
  });
});