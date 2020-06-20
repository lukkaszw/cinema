import React from 'react';
import { shallow } from 'enzyme';
import NextPrevBtns from './NextPrevBtns';

const mockedProps = {
  goToNextStep: jest.fn(),
  goToPrevStep: jest.fn(),
  isInactivePrev: false,
  isInactiveNext: false,
};  

const component = shallow(<NextPrevBtns {...mockedProps} />);

describe('OrderPanelButton component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders two Buttons', () => {
    const btnEl = component.find('Button');
    expect(btnEl.length).toBe(2);
  });

  it('renders first button as "Back" Button with proper props', () => {
    const prevBtnEl = component.find('Button').at(0);
    expect(prevBtnEl.props()).toEqual({
      variants: ['small'],
      action: mockedProps.goToPrevStep,
      disabled: false,
      children: 'Back',
    });
  });

  
  it('renders second button as "Next" Button with proper props', () => {
    const nextBtnEl = component.find('Button').at(1);
    expect(nextBtnEl.props()).toEqual({
      variants: ['small'],
      action: mockedProps.goToNextStep,
      disabled: false,
      children: 'Next',
    });
  });

  it('changes Buttons to disabled according to props', () => {
    const propsWithInactives = {
      ...mockedProps,
      isInactivePrev: true,
      isInactiveNext: true,
    }

    const inactiveComp = shallow(<NextPrevBtns {...propsWithInactives} />);
    expect(inactiveComp.find('Button').at(0).prop('disabled')).toBe(true);
    expect(inactiveComp.find('Button').at(1).prop('disabled')).toBe(true);
  });
});