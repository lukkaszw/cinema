import React from 'react';
import { shallow } from 'enzyme';
import SeatsRow from './SeatsRow';

const mockedProps = {
  handleToggleSeat: jest.fn(),
  seats: [
    {
      seatId: '1A',
      disabled: false,
      chosen: false,
    },
    {
      seatId: '4C',
      disabled: true,
      chosen: false,
    },
    {
      seatId: '10D',
      disabled: true,
      chosen: false,
    },
  ]
};

const component = shallow(<SeatsRow {...mockedProps}/>);

describe('SeatsRow component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it(`renders ${mockedProps.seats.length} Seats components with proper props`, () => {
    const seatsEl = component.find('Seat');
    expect(seatsEl.length).toBe(mockedProps.seats.length);

    seatsEl.forEach((seatEl, i) => {
      expect(seatEl.prop('chosen')).toBe(mockedProps.seats[i].chosen);
      expect(seatEl.prop('disabled')).toBe(mockedProps.seats[i].disabled);
    });
  });

  it('fires function with proper props', () => {
    const seatsEl = component.find('Seat');
    let funcCalledTimes = 0;
    expect(mockedProps.handleToggleSeat).toHaveBeenCalledTimes(funcCalledTimes);
    seatsEl.forEach((seatEl, i) => {
      seatEl.prop('onClick')();
      funcCalledTimes++;
      expect(mockedProps.handleToggleSeat).toHaveBeenCalledTimes(funcCalledTimes);
      const expectedId = mockedProps.seats[i].seatId;
      expect(mockedProps.handleToggleSeat).toHaveBeenCalledWith(expectedId);
    });
  });
});