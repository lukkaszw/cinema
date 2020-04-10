import React from 'react';
import { shallow } from 'enzyme';
import MainLayout from './MainLayout';
import Home from '../../views/Home/Home';
import About from '../../views/About/About';

describe('MainLayout component', () => {
  it('renders without crashing', () => {
    const component = shallow(<MainLayout />);
    expect(component).toBeTruthy();
  });

  it('includes header and footer', () => {
    const component = shallow(<MainLayout />);
    expect(component.exists('Header')).toBeTruthy();
    expect(component.exists('Footer')).toBeTruthy();
  });

  it('includes proper children', () => {
    const componentOne = shallow(
      <MainLayout>
        <Home />
      </MainLayout>
    );
    expect(componentOne.exists('Home')).toBeTruthy();
    expect(componentOne.exists('About')).toBeFalsy();

    const componentTwo = shallow(
      <MainLayout>
        <About />
      </MainLayout>
    );
    expect(componentTwo.exists('Home')).toBeFalsy();
    expect(componentTwo.exists('About')).toBeTruthy();
  });
});