import React from 'react';
import { shallow } from 'enzyme';
import MainLayout from './MainLayout';
const MockedComponent = () => <div>Mocked Component</div>;
const MockedComponent2 = () => <div>Mocked Component2</div>;

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
        <MockedComponent />
      </MainLayout>
    );
    expect(componentOne.exists('MockedComponent')).toBeTruthy();
    expect(componentOne.exists('MockedComponent2')).toBeFalsy();

    const componentTwo = shallow(
      <MainLayout>
        <MockedComponent2 />
      </MainLayout>
    );
    expect(componentTwo.exists('HoMockedComponentme')).toBeFalsy();
    expect(componentTwo.exists('MockedComponent2')).toBeTruthy();
  });
});