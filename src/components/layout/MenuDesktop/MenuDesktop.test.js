import React from 'react';
import { shallow } from 'enzyme';
import MenuDesktop from './MenuDesktop';

const mockedProps = {
  links: [
    {
      title: 'Home',
      to: '/',
    },
    {
      title: 'Schedule',
      to: '/schedule',
    },
    {
      title: 'About',
      to: '/about',
    },
  ]
};

const component = shallow(<MenuDesktop {...mockedProps}/>);

describe('MenuDesktop component', () => { 
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  }); 

  it('includes 5 list items and one ButtonLink', () => {
    expect(component.find('ul .item').length).toBe(5);
    
  });

  it('includes ButtonLink with title Sign in', () => {
    const buttonLinkEl = component.find('ButtonLink');
    expect(buttonLinkEl.exists()).toBeTruthy();
    expect(buttonLinkEl.prop('title')).toEqual('Sign in');
  });

  it('includes IconButton', () => {
    expect(component.find('IconButton').exists()).toBeTruthy();
  });

  it('includes 3 NavLinks related to props links', () => {
    const navLinks = component.find('NavLink');
    expect(navLinks.length).toBe(3);
    for( let i = 0; i < mockedProps.links.length; i++) {
      expect(navLinks.at(i).text()).toEqual(mockedProps.links[i].title);
      expect(navLinks.at(i).prop('to')).toBe(mockedProps.links[i].to);
    }
  });
});