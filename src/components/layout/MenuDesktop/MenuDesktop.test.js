import React from 'react';
import { shallow } from 'enzyme';
import MenuDesktop from './MenuDesktop';
import { faSearch, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';

const mockedProps = {
  isAuth: false,
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
  ],
  openSearchPanel: jest.fn(),
};

const mockedPropsWhenAuthenticated = {
  ...mockedProps,
  isAuth: true,
};



describe('MenuDesktop component', () => { 
  const component = shallow(<MenuDesktop {...mockedProps}/>);

  describe('common features', () => {
    it('renders without crashing', () => {
      expect(component).toBeTruthy();
    }); 
  
    it('includes 5 list items', () => {
      expect(component.find('ul .item').length).toBe(5);
    });

    it('includes IconButton with proper props', () => {
      const iconBtnEl = component.find('IconButton');
      expect(iconBtnEl.exists()).toBeTruthy();
      expect(iconBtnEl.props()).toEqual({
        icon: faSearch,
        ariaLabel: 'Search movies',
        action: mockedProps.openSearchPanel,
      });
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

  describe('when user is not authenticated', () => {
    const component = shallow(<MenuDesktop {...mockedProps}/>);

    it('includes small ButtonLink with title "Sign in" and link to "/auth"', () => {
      const btnLinkEl = component.find('ButtonLink');
      expect(btnLinkEl.exists()).toBeTruthy();
      expect(btnLinkEl.prop('size')).toBe('small');
      expect(btnLinkEl.prop('title')).toBe('Sign in');
      expect(btnLinkEl.prop('to')).toBe('/auth');
    });

    it('does not include icon buttons links to user page and to logout', () => {
      const iconLinksEl = component.find('IconLink');
      expect(iconLinksEl.exists()).toBeFalsy();
    });
  });

  describe('when user is authenticated', () => {
    const component = shallow(<MenuDesktop {...mockedPropsWhenAuthenticated}/>);

    it('does not render ButtonLink to sign in', () => {
      const btnLinkEl = component.find('ButtonLink');
      expect(btnLinkEl.exists()).toBeFalsy();
    });

    it('renders icon links to user page and to logout with proper icons', () => {
      const iconLinksEl = component.find('IconLink');
      expect(iconLinksEl.length).toBe(2);
      expect(iconLinksEl.at(0).prop('to')).toBe('/user');
      expect(iconLinksEl.at(0).prop('icon')).toEqual(faUser);
      expect(iconLinksEl.at(1).prop('to')).toBe('/logout');
      expect(iconLinksEl.at(1).prop('icon')).toEqual(faPowerOff);
    });
  });

});