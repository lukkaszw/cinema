import React from 'react';
import { shallow } from 'enzyme';
import UserNav from './UserNav';
import navItems from './navItems';

const component = shallow(<UserNav />);

describe('UserNav component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it(`includes ${navItems.length} UserNavItem elements with proper props`, () => {
    const userNavItems = component.find('UserNavItem');
    expect(userNavItems.length).toBe(navItems.length);
    userNavItems.forEach((item, i) => {
      expect(item.props({
        to: navItems[i].to,
        name: navItems[i].name,
        icon: navItems[i].icon,
      }))
    });
  });
});