import React from 'react';
import { shallow } from 'enzyme';
import OrderConfirm from './OrderConfirm';

const mockedProps = {
  name: 'Name', 
  surname: 'Surname', 
  phone: '666 666 666', 
  email: 'someemail@wp.pl', 
  price: 10, 
  chosenSeats: ['2A', '3C'], 
  handleCancelTicket: jest.fn() , 
  onSubmitOrder: jest.fn(), 
  isSendingOrder: false,
};

const component = shallow(<OrderConfirm {...mockedProps}/>);

describe('OrderConfirm component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders info about name and surname', () => {
    const expectedText = `${mockedProps.name} ${mockedProps.surname}`;
    const nameSurnEl = component.find('.value').at(0);
    expect(nameSurnEl.text()).toBe(expectedText);
  });

  it('renders info about phone and emial', () => {
    const contactEl = component.find('.contactItem');
    expect(contactEl.at(0).text()).toBe(mockedProps.phone);
    expect(contactEl.at(1).text()).toBe(mockedProps.email);
  });

  it('renders proper tickets amount', () => {
    const ticketsAmountEl = component.find('.ticketsAmount');
    expect(ticketsAmountEl.text()).toMatch(mockedProps.chosenSeats.length.toString());
  });

  it(`renders list of ${mockedProps.chosenSeats.length} Ticket components with proper props`, () => {
    const ticketEl = component.find('.list Ticket');
    expect(ticketEl.length).toBe(mockedProps.chosenSeats.length);  
    ticketEl.forEach((ticketEl, i) => {
      expect(ticketEl.prop('ticketId')).toBe(mockedProps.chosenSeats[i]);
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
      const ticketId = mockedProps.chosenSeats[i];
      expect(mockedProps.handleCancelTicket).toHaveBeenCalledTimes(funcCalledTimes);
      expect(mockedProps.handleCancelTicket).toHaveBeenCalledWith(ticketId);
    });
  });

  it('renders TicketsSummary with proper props', () => {
    const ticketSummaryEl = component.find('TicketsSummary');
    expect(ticketSummaryEl.exists()).toBeTruthy();
    expect(ticketSummaryEl.props()).toEqual({
      tickets: mockedProps.chosenSeats,
      price: mockedProps.price,
    });
  });

  it('renders order Button with proper action', () => {
    const btnEl = component.find('Button');
    expect(btnEl.props()).toEqual({
      variants: ['tertiary'],
      action: mockedProps.onSubmitOrder,
      disabled: mockedProps.isSendingOrder,
      children: 'Order!',
    })
  });

  it('renders order Button which disabled setting reacts in proper way on isSendingOrder props', () => {
    //check when isSendingOrder is false
    expect(component.find('Button').prop('disabled')).toBeFalsy();

    const propsWhenSendingOrder = {
      ...mockedProps,
      isSendingOrder: true,
    };

    const sendingOrderComp = shallow(<OrderConfirm {...propsWhenSendingOrder}/>);
    //check when component is sending order
    expect(sendingOrderComp.find('Button').prop('disabled')).toBeTruthy();
  });
});