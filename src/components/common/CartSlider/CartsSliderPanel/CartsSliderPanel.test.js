import React from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { shallow } from 'enzyme';
import { CartsSliderPanel } from './CartsSliderPanel';


const mockedProps = {
  goToNextCart: jest.fn(),
  goToPreviousCart: jest.fn(),
  moviesAmount: 10,
  isInactivePrev: false,
  isInactiveNext: false,
};

const component = shallow(<CartsSliderPanel {...mockedProps} />);

describe('CartsSliderPanel component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders two buttons to change slides with proper props', () => {
    const buttonsEl = component.find('IconButton');
    expect(buttonsEl.at(0).prop('action')).toBe(mockedProps.goToNextCart);
    expect(buttonsEl.at(0).prop('icon')).toEqual(faChevronLeft);
    expect(buttonsEl.at(1).prop('action')).toBe(mockedProps.goToPreviousCart);
    expect(buttonsEl.at(1).prop('icon')).toEqual(faChevronRight);
    expect(buttonsEl.at(0).prop('disabled')).toBe(false);
    expect(buttonsEl.at(1).prop('disabled')).toBe(false);
  });

  it('renders propr disabled when isInactive props are true', () => {
    const inactiveProps = {
      ...mockedProps,
      isInactiveNext: true,
      isInactivePrev: true,
    };

    const inactiveComp = shallow(<CartsSliderPanel {...inactiveProps} />);
    
    const buttonsEl = inactiveComp.find('IconButton');
    expect(buttonsEl.at(0).prop('disabled')).toBe(true);
    expect(buttonsEl.at(1).prop('disabled')).toBe(true);
  });

  it('renders proper message', () => {
    const pEl = component.find('p');
    expect(pEl.text()).toBe(`${mockedProps.moviesAmount} upcoming movies`);
  });
});