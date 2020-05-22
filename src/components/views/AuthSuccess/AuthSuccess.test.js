import React from 'react';
import { shallow } from 'enzyme';
import AuthSuccess from './AuthSuccess';

const component = shallow(<AuthSuccess />);


describe('AuthSuccess component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes button with link to home page', () => {
    const btnEl = component.find('ButtonLink');
    expect(btnEl.prop('to')).toBe('/');
  });
});