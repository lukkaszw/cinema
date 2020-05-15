import React from 'react';
import { shallow } from 'enzyme';
import PullOutMenu from './PullOutMenu';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
  ],
  closeAction: jest.fn(),
  openSearchPanel: jest.fn(),
};

const component = shallow(<PullOutMenu {...mockedProps}/>);

describe('PullOutMenu component', () => {
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

  it('includes two left and right courtains elements', () => {
    expect(component.find('.leftCourtain').exists()).toBeTruthy();
    expect(component.find('.rightCourtain').exists()).toBeTruthy();
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

  it('includes small ButtonLink with title "Sign in" and to "/login"', () => {
    const btnLinkEl = component.find('ButtonLink');
    expect(btnLinkEl.exists()).toBeTruthy();
    expect(btnLinkEl.prop('size')).toBe('small');
    expect(btnLinkEl.prop('title')).toBe('Sign in');
    expect(btnLinkEl.prop('to')).toBe('/login');
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