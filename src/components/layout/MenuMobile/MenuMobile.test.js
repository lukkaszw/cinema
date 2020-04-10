import React from 'react';
import { shallow } from 'enzyme';
import MenuMobile from './MenuMobile';

const component = shallow(<MenuMobile />);

describe('MenuMobile component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes MenuBtn', () => {
    expect(component.find('MenuBtn').exists()).toBeTruthy();
  });

  it('includes PullOutMenu', () => {
    expect(component.find('PullOutMenu').exists()).toBeTruthy();
  });

  it('has MenuBtn, PullOutMenu components with prop isActive value as false' ,() => {
    expect(component.find('MenuBtn').prop('isActive')).toBeFalsy();
    expect(component.find('PullOutMenu').prop('isActive')).toBeFalsy();
  });

  it('changes isActive prop in MenuBtn, PullOutMenu when MenuBtn is clicked', () => {
    const menuBtnEl = component.find('MenuBtn');
    menuBtnEl.prop('toggleAction')();
    expect(component.find('MenuBtn').prop('isActive')).toBeTruthy();
    expect(component.find('PullOutMenu').prop('isActive')).toBeTruthy();
    menuBtnEl.prop('toggleAction')();
    expect(component.find('MenuBtn').prop('isActive')).toBeFalsy();
    expect(component.find('PullOutMenu').prop('isActive')).toBeFalsy();
    menuBtnEl.prop('toggleAction')();
    expect(component.find('MenuBtn').prop('isActive')).toBeTruthy();
    expect(component.find('PullOutMenu').prop('isActive')).toBeTruthy();
  });

  it('update isActive when closeAction in PullOutMenu is loaded', () => {
    const component2 = shallow(<MenuMobile />);
    const menuBtnEl = component2.find('MenuBtn');
    const pullOutMenuEl = component2.find('PullOutMenu');
    //click menu to open menu:
    menuBtnEl.prop('toggleAction')();
    expect(component2.find('MenuBtn').prop('isActive')).toBeTruthy();
    expect(component2.find('PullOutMenu').prop('isActive')).toBeTruthy();
    //load closeAction in PullOutMenu
    pullOutMenuEl.prop('closeAction')();
    expect(component2.find('MenuBtn').prop('isActive')).toBeFalsy();
    expect(component2.find('PullOutMenu').prop('isActive')).toBeFalsy();
  });
});