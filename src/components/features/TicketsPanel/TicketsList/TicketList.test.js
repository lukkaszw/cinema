import React from 'react';
import { shallow } from 'enzyme';
import TicketList from './TicketsList';
import TicketsList from './TicketsList';

const mockedProps = {
  tickets: ['2A', '3B'],
  handleCancelTicket: jest.fn(),
  price: 12,
};

const propsWithoutTickets = {
  ...mockedProps,
  tickets: [],
};

const component = shallow(<TicketList {...mockedProps}/>);
const compWithoutTickets = shallow(<TicketsList {...propsWithoutTickets} />);

describe('TicketList component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
    expect(compWithoutTickets).toBeTruthy();
  });

  it(`renders list of ${mockedProps.tickets.length} Tickets components with proper props when tickets are chosen`, () => {
    const ticketsEl = component.find('.list Ticket');
    expect(ticketsEl.length).toBe(mockedProps.tickets.length);
    ticketsEl.forEach((ticketEl, i) => {
      expect(ticketEl.prop('ticketId')).toBe(mockedProps.tickets[i]);
      expect(ticketEl.prop('price')).toBe(mockedProps.price);
    });
  });

  it('renders message "No tickets chosen!" if tickets are not chosen', () => {
    const messageEl = compWithoutTickets.find('.message');
    expect(messageEl.exists()).toBeTruthy();
    expect(messageEl.text()).toBe("No tickets chosen!");
  });

  it('fires proper function with proper data to cancel a ticket', () => {
    const ticketsEl = component.find('.list Ticket');
    let funcCalledTimes = 0;
    expect(mockedProps.handleCancelTicket).toHaveBeenCalledTimes(funcCalledTimes);
    ticketsEl.forEach((ticketEl, i) => {
      ticketEl.prop('onCancel')();
      funcCalledTimes++;
      expect(mockedProps.handleCancelTicket).toHaveBeenCalledTimes(funcCalledTimes);
      expect(mockedProps.handleCancelTicket).toHaveBeenCalledWith(mockedProps.tickets[i]);
    });
  });
});