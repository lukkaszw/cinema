import React from 'react';
import { shallow } from 'enzyme';
import Seats from './Seats';

const mockedProps = {
  handleToggleSeat: () => console.log('handle toggle seat'),
  seats: [
    [
      {
        seatId: '1A',
        disabled: false,
      }
    ],
    [
      {
        seatId: '1B',
        disabled: false,
      }
    ],
  ],
};

const component = shallow(<Seats {...mockedProps}/>);

describe('Seats component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it(`renders ${mockedProps.seats.length} SeatsRow components with proper props`, () => {
    const seatsRowsEl = component.find('Memo(SeatsRow)');
    expect(seatsRowsEl.length).toBe(mockedProps.seats.length);
    seatsRowsEl.forEach((seatsRowEl, i) => {
      expect(seatsRowEl.props()).toEqual({
        seats: mockedProps.seats[i],
        handleToggleSeat: mockedProps.handleToggleSeat,
      });
    });
  });
});