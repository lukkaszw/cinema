import React from 'react';
import { shallow } from 'enzyme';
import PullOutMenu from './PullOutMenu';
import { faSearch, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';

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
  closeAction: jest.fn(),
  openSearchPanel: jest.fn(),
};

const mockedPropsWhenAuthenticated = {
  ...mockedProps,
  isAuth: true,
}



describe('PullOutMenu component', () => {
  describe('common features', () => {
    const component = shallow(<PullOutMenu {...mockedProps}/>);
    
    it('renders without crashing', () => {
      expect(component).toBeTruthy();
    });
  
    it('has not got an active class when prop isActive is default or false', () => {
      expect(component.hasClass('active')).toBeFalsy();
      const componentWithFalseIsActive = shallow(<PullOutMenu isActive={false} {...mockedProps}/>);
      expect(componentWithFalseIsActive.hasClass('active')).toBeFalsy();
    });
  
    it('has got an active class when prop isActive is true', () => {
      const componentWithTrueIsActive = shallow(<PullOutMenu isActive={true} {...mockedProps}/>);
      expect(componentWithTrueIsActive.hasClass('active')).toBeTruthy();
    });
  
    it('includes Logo component', () => {
      expect(component.find('Logo').exists()).toBeTruthy();
    });
  
  
    it('includes IconButton with faSearch icon', () => {
      const iconBtnEl = component.find('IconButton');
      expect(iconBtnEl.exists()).toBeTruthy();
      expect(iconBtnEl.prop('icon')).toEqual(faSearch);
    });
  
    it('opens search modal and closes menu when icon button is clicked', () => {
      expect(mockedProps.closeAction).toHaveBeenCalledTimes(0);
      expect(mockedProps.openSearchPanel).toHaveBeenCalledTimes(0);
      const iconBtnEl = component.find('IconButton');
      iconBtnEl.prop('action')();
      expect(mockedProps.closeAction).toHaveBeenCalledTimes(1);
      expect(mockedProps.openSearchPanel).toHaveBeenCalledTimes(1);
    });

    it('includes links list', () => {
      const listEl = component.find('ul.list');
      expect(listEl.exists()).toBeTruthy();
    });
  
    it('includes 3 NavLinks with proper links and titles', () => {
      const navLinksEl = component.find('NavLink');
      expect(navLinksEl.length).toBe(3);
      for(let i = 0; i < mockedProps.links.length; i++) {
        expect(navLinksEl.at(i).prop('to')).toBe(mockedProps.links[i].to);
        expect(navLinksEl.at(i).text()).toEqual(mockedProps.links[i].title);
      }
    });
  });


  describe('when user is not authenticated', () => {
    const component = shallow(<PullOutMenu {...mockedProps}/>);

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
    const component = shallow(<PullOutMenu {...mockedPropsWhenAuthenticated}/>);

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