import React from 'react';
import { shallow } from 'enzyme';
import CartSlider from './CartSlider';
import {
  generalMockedProps
} from './CartSlider.test';
import interval from '../../../config/comingFilmsInterval';

const mockedProps = generalMockedProps;

let component;

describe('Interval in CartSlider', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    component = shallow(<CartSlider {...mockedProps} />);
  });

  afterEach(() => {
    jest.useRealTimers();
  });


  it('updates active cart properly', () => {

    expect(component.state('activeCart')).toBe(0);

    for(let i = 1; i < mockedProps.data; i++) {
      jest.advanceTimersByTime(interval.speed);
      expect(component.state('activeCart')).toBe(i);
    }

    for(let i = mockedProps.data - 1; i === 0; i--) {
      jest.advanceTimersByTime(interval.speed);
      expect(component.state('activeCart')).toBe(i);
    }

    for(let i = 1; i < mockedProps.data; i++) {
      jest.advanceTimersByTime(interval.speed);
      expect(component.state('activeCart')).toBe(i);
    }

    for(let i = mockedProps.data - 1; i === 0; i--) {
      jest.advanceTimersByTime(interval.speed);
      expect(component.state('activeCart')).toBe(i);
    }

    
  });

  it('stop interval when user uses button to update carts manualy', () => {

    const instance = component.instance();
    //started state
    expect(component.state('activeCart')).toBe(0);
     //after normal interval time
    jest.advanceTimersByTime(interval.speed);
    expect(component.state('activeCart')).toBe(1);
    // user uses button to go to next cart
    instance.goToNextCart();
    expect(component.state('activeCart')).toBe(2);
    // after normal interval time nothing should be happened - interval is switched off
    jest.advanceTimersByTime(interval.speed);
    expect(component.state('activeCart')).toBe(2);
    // after break interval should work again
    jest.advanceTimersByTime(interval.break);
    expect(component.state('activeCart')).toBe(3);
    // user uses button to go to previous cart two times
    instance.goToPreviousCart();
    instance.goToPreviousCart();
    expect(component.state('activeCart')).toBe(1);
    // after break interval should work again
    jest.advanceTimersByTime(interval.break + interval.speed);
    expect(component.state('activeCart')).toBe(0);
    // user uses button to go to next cart three times
    instance.goToNextCart();
    instance.goToNextCart();
    instance.goToNextCart();
    expect(component.state('activeCart')).toBe(3);
    // after break interval should work again
    jest.advanceTimersByTime(interval.break + interval.speed);
    expect(component.state('activeCart')).toBe(2);
  });
});