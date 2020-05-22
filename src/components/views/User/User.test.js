import React from 'react';
import { shallow } from 'enzyme';
import User from './User';

const component = shallow(<User />);

describe('User component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
})