import React from 'react';
import { shallow } from 'enzyme';
import Screen from './Screen';

const component = shallow(<Screen />);

describe('Screen component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});