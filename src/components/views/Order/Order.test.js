import React from 'react';
import { shallow } from 'enzyme';
import Order from './Order';

describe('Order Component', () => {
  it('renders without crashing', () => {
    const component = shallow(<Order />);
    expect(component).toBeTruthy();
  });
});