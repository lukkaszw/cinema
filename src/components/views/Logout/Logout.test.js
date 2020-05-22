import React from 'react';
import { shallow } from 'enzyme';
import Logout from './Logout';

const mockedProps = {
  onLogout: () => {},
  token: 'sometoken',
};

const component = shallow(<Logout {...mockedProps} />);

describe('Logout component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes Redirect to home page', () => {
    const redirectEl = component.find('Redirect');
    expect(redirectEl.exists()).toBeTruthy();
    expect(redirectEl.prop('to')).toBe('/');
  });
});