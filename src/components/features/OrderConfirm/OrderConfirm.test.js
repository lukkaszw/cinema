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

  it('renders PurchaserDetails with proper props', () => {
    const purchDetailsEl = component.find('Memo(PurchaserDetails)');
    expect(purchDetailsEl.length).toBe(1);
    expect(purchDetailsEl.props()).toEqual({
      name: mockedProps.name,
      surname: mockedProps.surname,
      phone: mockedProps.phone,
      email: mockedProps.email,
    });
  });

  it('renders TicketsDetails with proper props', () => {
    const ticketsDetailsEl = component.find('Memo(TicketsDetails)');
    expect(ticketsDetailsEl.length).toBe(1);
    expect(ticketsDetailsEl.props()).toEqual({
      tickets: mockedProps.chosenSeats,
      handleCancelTicket: mockedProps.handleCancelTicket,
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