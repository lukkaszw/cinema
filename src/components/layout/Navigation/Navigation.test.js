import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './Navigation';

let component; 
describe('Navigation component', () => {
  beforeEach(() => {
    component = shallow(<Navigation />);
  });

  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes MenuDesktop', () => {
    expect(component.find('MenuDesktop').exists()).toBeTruthy();
  });

  it('includes MenuMobile', () => {
    expect(component.find('MenuMobile').exists()).toBeTruthy();
  });

  it('does not render SearchPanel after mount', () => {
    
    expect(component.find('Connect(SearchPanel)').exists()).toBeFalsy();
  });

  it('renders searchPanel if user set is to open in desktop menu', () => {
    const desktopMenu = component.find('MenuDesktop');
    desktopMenu.prop('openSearchPanel')();
    expect(component.find('Connect(SearchPanel)').exists()).toBeTruthy();
  });

  it('renders searchPanel if user set is to open in mobile menu', () => {
    const mobileMenu = component.find('MenuMobile');
    mobileMenu.prop('openSearchPanel')();
    expect(component.find('Connect(SearchPanel)').exists()).toBeTruthy();
  });

  it('closes SearchPanel if user close it in this modal', () => {
    //first open modal
    component.find('MenuMobile').prop('openSearchPanel')();

    const searchPanel = component.find('Connect(SearchPanel)');
    searchPanel.prop('closeAction')();

    expect(component.find('Connect(SearchPanel)').exists()).toBeFalsy();
  });
});