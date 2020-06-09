import React from 'react';
import { shallow } from 'enzyme';
import SeatsPanel from './SeatsPanel';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockedProps = {
  seats: [],
  handleToggleSeat: () => console.log('handleToggleSeats'),
}

const component = shallow(<SeatsPanel {...mockedProps}/>);

describe('SeatsPanel component', () => {

  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
  
  it('renders panel element with proper transform styles at the begining', () => {
    const panelEl = component.find('.panel');
    expect(panelEl.exists()).toBeTruthy();
    expect(panelEl.prop('style')).toEqual({ transform: 'translateX(-50%)'});
  });

  it('renders Screen component', () => {
    const screenEl = component.find('Screen');
    expect(screenEl.exists()).toBeTruthy();
  });

  it('renders Seats element with proper props', () => {
    const seatsEl = component.find('Seats');
    expect(seatsEl.exists()).toBeTruthy();
    expect(seatsEl.props()).toEqual({
      seats: mockedProps.seats,
      handleToggleSeat: mockedProps.handleToggleSeat,
    });
  });

  it('renders two IconButtons', () => {
    const iconButtonEl = component.find('IconButton');
    expect(iconButtonEl.length).toBe(2);
  }); 
});