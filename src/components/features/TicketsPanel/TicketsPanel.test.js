import React from 'react';
import { shallow } from 'enzyme';
import TicketsPanel from './TicketsPanel';

const mockedProps = {
  tickets: ['1A', '2B'],
  handleCancelTicket: () => console.log('handleCancelTicket'),
  price: 10,
};

const component = shallow(<TicketsPanel {...mockedProps}/>);

describe('TicketsPanel component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders TicketsList with proper props', () => {
    const ticketsListEl = component.find('TicketsList');
    expect(ticketsListEl.exists()).toBeTruthy();
    expect(ticketsListEl.props()).toEqual({
      tickets: mockedProps.tickets,
      price: mockedProps.price,
      handleCancelTicket: mockedProps.handleCancelTicket,
    });
  });

  it('renders TicketsSummary with proper props', () => {
    const ticketsSummaryEl = component.find('TicketsSummary');
    expect(ticketsSummaryEl.exists()).toBeTruthy();
    expect(ticketsSummaryEl.props()).toEqual({
      tickets: mockedProps.tickets,
      price: mockedProps.price,
    });
  });

  it('renders button element', () => {
    const btnEl = component.find('Button');
    expect(btnEl.exists()).toBeTruthy();
  });

  it('renders wrapper without class visible at the begining', () => {
    const rootEl = component.find('.root');
    expect(rootEl.exists()).toBeTruthy();
    expect(rootEl.hasClass('visible')).toBeFalsy();
  });

  it('changes visibility of component by clicking on button', () => {
    const btnEl = component.find('Button');
    btnEl.prop('action')();
    expect(component.find('.root').hasClass('visible')).toBeTruthy();
    btnEl.prop('action')();
    expect(component.find('.root').hasClass('visible')).toBeFalsy();
  });
});