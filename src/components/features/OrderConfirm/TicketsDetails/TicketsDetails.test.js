import React from 'react';
import { shallow } from 'enzyme';
import TicketsDetails from './TicketsDetails';

const mockedProps = {
  tickets: ['2A', '3C'], 
  price: 10,
  handleCancelTicket: jest.fn(),
};

const component = shallow(<TicketsDetails {...mockedProps} />);

describe('TicketsDetails component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

    it('renders proper tickets amount', () => {
    const ticketsAmountEl = component.find('.ticketsAmount');
    expect(ticketsAmountEl.text()).toMatch(mockedProps.tickets.length.toString());
  });

  it(`renders list of ${mockedProps.tickets.length} Ticket components with proper props`, () => {
    const ticketEl = component.find('.list Ticket');
    expect(ticketEl.length).toBe(mockedProps.tickets.length);  
    ticketEl.forEach((ticketEl, i) => {
      expect(ticketEl.prop('ticketId')).toBe(mockedProps.tickets[i]);
      expect(ticketEl.prop('price')).toBe(mockedProps.price);
    });
  });

  it('fires handleCancelTicket function with proper value when clicking on Ticket component', () => {
    const ticketEl = component.find('.list Ticket');
    let funcCalledTimes = 0;
    expect(mockedProps.handleCancelTicket).toHaveBeenCalledTimes(funcCalledTimes);
    ticketEl.forEach((ticketEl, i) => {
      funcCalledTimes++;
      ticketEl.prop('onCancel')();
      const ticketId = mockedProps.tickets[i];
      expect(mockedProps.handleCancelTicket).toHaveBeenCalledTimes(funcCalledTimes);
      expect(mockedProps.handleCancelTicket).toHaveBeenCalledWith(ticketId);
    });
  });

  it('renders TicketsSummary with proper props', () => {
    const ticketSummaryEl = component.find('TicketsSummary');
    expect(ticketSummaryEl.exists()).toBeTruthy();
    expect(ticketSummaryEl.props()).toEqual({
      tickets: mockedProps.tickets,
      price: mockedProps.price,
    });
  });
});