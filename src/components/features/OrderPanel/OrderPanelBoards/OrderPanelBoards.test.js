import React from 'react';
import { shallow } from 'enzyme';
import OrderPanelBoards from './OrderPanelBoards';

const mockedProps = {
  orderStep: 1,
  seats: [],
  name: 'Somename',
  surname: 'Somesurname',
  phone: '222 222 222',
  email: 'someemail@gmail.com',
  handleChangeInputValue: jest.fn(),
  valuesErrors: {},
  chosenSeats: ['2A', '3C'],
  price: 12,
  isSendingOrder: false,
  handleToggleSeat: jest.fn(),
  handleCancelTicket: jest.fn(),
  handleSubmitOrder: jest.fn(),
};

const component = shallow(<OrderPanelBoards {...mockedProps} />);

describe('OrderPanelView component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders panel with proper translate state after mount', () => {
    const panelEl = component.find('.root');
    expect(panelEl.exists()).toBeTruthy();
    expect(panelEl.prop('style')).toEqual({
      transform: 'translateX(-0%)',
    });
  });

  it('renders 3 boards inside panel', () => {
    const boardEl = component.find('.board');
    expect(boardEl.length).toBe(3);
  });

  it('renders SeatsPanel component inside first board', () => {
    const firstBoardEl = component.find('.board').at(0);
    const seatsPanelEL = firstBoardEl.find('Memo(SeatsPanel)');
    expect(seatsPanelEL.length).toBe(1);
    expect(seatsPanelEL.props()).toEqual({
      seats: mockedProps.seats,
      handleToggleSeat: mockedProps.handleToggleSeat,
    });
  });

  it('renders OrderForm component inside second board', () => {
    const secondBoardEl = component.find('.board').at(1);
    const orderFormEl = secondBoardEl.find('Memo(OrderForm)');
    expect(orderFormEl.length).toBe(1);
    expect(orderFormEl.props()).toEqual({
      name: mockedProps.name,
      surname: mockedProps.surname,
      phone: mockedProps.phone,
      email: mockedProps.email,
      errors: mockedProps.valuesErrors,
      handleChangeInputValue: mockedProps.handleChangeInputValue,
    });
  });

  it('renders OrderConfirm component inside third board', () => {
    const thirdBoardEl = component.find('.board').at(2);
    const confirmEl = thirdBoardEl.find('OrderConfirm');
    expect(confirmEl.length).toBe(1);
    expect(confirmEl.props()).toEqual({
      name: mockedProps.name,
      surname: mockedProps.surname,
      phone: mockedProps.phone,
      email: mockedProps.email,
      chosenSeats: mockedProps.chosenSeats,
      handleCancelTicket: mockedProps.handleCancelTicket,
      price: mockedProps.price,
      onSubmitOrder: mockedProps.handleSubmitOrder,
      isSendingOrder: mockedProps.isSendingOrder,
    });
  });
});