import React from 'react';
import { shallow } from 'enzyme';
import OrderProcessBar from './OrderProcessBar';

const mockedProps = {
  orderStep: 1,
};

const component = shallow(<OrderProcessBar {...mockedProps}/>);

const checkActiveClass = (orderStep, hasClassActive) => {
  const componentX = shallow(<OrderProcessBar orderStep={orderStep}/>); 
  const stepEl = componentX.find('.step');
  stepEl.forEach((step, i) => {
    expect(step.hasClass('active')).toBe(hasClassActive[i]);
  });
}

describe('OrderProcessBar component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders 3 step elements', () => {
    const stepEl = component.find('.step');
    expect(stepEl.length).toBe(3);
  });

  it('renders active steps with active class according to orderStep prop', () => {
    //check when orderStep value is 1
    checkActiveClass(1, [true, false, false]);
    //check when orderStep value is 2
    checkActiveClass(2, [true, true, false]);
     //check when orderStep value is 3
     checkActiveClass(3, [true, true, true]);
  });
});