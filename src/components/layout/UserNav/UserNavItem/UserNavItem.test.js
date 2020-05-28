import React from 'react';
import { shallow } from 'enzyme';
import { faAd } from '@fortawesome/free-solid-svg-icons';
import UserNavItem from './UserNavItem';

const mockedProps = {
  to: '/somepage',
  name: 'Some page',
  icon: faAd,
};

const component = shallow(<UserNavItem {...mockedProps}/>);

describe('UserNavItem component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders NavLink with proper props', () => {
    const navLinkEl = component.find('li NavLink');
    expect(navLinkEl.exists()).toBeTruthy();
    expect(navLinkEl.prop('exact')).toBe(true); 
    expect(navLinkEl.prop('to')).toBe(mockedProps.to);
    expect(navLinkEl.prop('className')).toBe('link');
    expect(navLinkEl.prop('activeClassName')).toBe('active');
  });

  it('renders name el with proper text inside NavLink', () => {
    const nameEl = component.find('NavLink .name');
    expect(nameEl.exists()).toBeTruthy();
    expect(nameEl.text()).toBe(mockedProps.name);
  });

  it('renders FontAwesomeIcon element inside NavLink with proper icon', () => {
    const iconEl = component.find('NavLink FontAwesomeIcon');
    expect(iconEl.exists());
    expect(iconEl.prop('icon')).toEqual(mockedProps.icon);
  });
});