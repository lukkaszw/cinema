import React from 'react';
import { shallow } from 'enzyme';
import { OrderPanel } from './OrderPanel';

const mockedUserData = {
  name: 'Name',
  surname: 'Surname',
  phone: '666 666 666',
  email: 'someemail@gmail.com',
}

const mockedProps = {
  isFetchingSeats: false,
  isFetchingError: false, 
  isSendingOrder: false,
  isOrderSuccess: false,
  isOrderError: false,
  resetFormState: jest.fn(),
  orderTickets: jest.fn(),
  token: 'someToken',
  showId: '1',
  chosenSeats: [],
  seats: [],
  handleToggleSeat: jest.fn(),
  handleCancelTicket: jest.fn(),
  price: 10,
  userData: mockedUserData,
};

const createEventValue = (value) => ({
    target: { value },
});

let component;

describe('OrderPanel component', () => {
  describe('rendering', () => {
    beforeEach(() => {
      component = shallow(<OrderPanel {...mockedProps}/>);
    });

    it('renders without crashing', () => {
      expect(component).toBeTruthy();
    });
  
    it('renders OrderProcessBar component', () => {
      const orderProcBarEl = component.find('OrderProcessBar');
      expect(orderProcBarEl.exists()).toBeTruthy();
      expect(orderProcBarEl.props()).toEqual({
        orderStep: component.state('orderStep'), 
      });
    });

    it('renders panel with proper translate state after mount', () => {
      const panelEl = component.find('.panel');
      expect(panelEl.exists()).toBeTruthy();
      expect(panelEl.prop('style')).toEqual({
        transform: 'translateX(-0%)',
      });
    });

    it('renders 3 boards inside panel', () => {
      const boardEl = component.find('.panel .board');
      expect(boardEl.length).toBe(3);
    });

    it('renders SeatsPanel component inside first board', () => {
      const firstBoardEl = component.find('.panel .board').at(0);
      const seatsPanelEL = firstBoardEl.find('SeatsPanel');
      expect(seatsPanelEL.exists()).toBeTruthy();
      expect(seatsPanelEL.props()).toEqual({
        seats: mockedProps.seats,
        handleToggleSeat: mockedProps.handleToggleSeat,
      });
    });

    it('renders OrderForm component inside second board', () => {
      const secondBoardEl = component.find('.panel .board').at(1);
      const orderFormEl = secondBoardEl.find('OrderForm');
      expect(orderFormEl.exists()).toBeTruthy();
      const instance = component.instance();
      expect(orderFormEl.props()).toEqual({
        name: component.state('name'),
        surname: component.state('surname'),
        phone: component.state('phone'),
        email: component.state('email'),
        errors: component.state('valuesErrors'),
        handleChangeInputValue: instance.handleChangeInputValue,
      });
    });

    it('renders OrderConfirm component inside third board', () => {
      const thirdBoardEl = component.find('.panel .board').at(2);
      const confirmEl = thirdBoardEl.find('OrderConfirm');
      const instance = component.instance();
      expect(confirmEl.exists()).toBeTruthy();
      expect(confirmEl.props()).toEqual({
        name: component.state('name'),
        surname: component.state('surname'),
        phone: component.state('phone'),
        email: component.state('email'),
        chosenSeats: mockedProps.chosenSeats,
        handleCancelTicket: mockedProps.handleCancelTicket,
        price: mockedProps.price,
        onSubmitOrder: instance.handleSubmitOrder,
        isSendingOrder: mockedProps.isSendingOrder,
      });
    });

    it('renders two Buttons', () => {
      const btnEl = component.find('Button');
      expect(btnEl.length).toBe(2);
    });

    it('renders first button as "Back" Button with proper props', () => {
      const prevBtnEl = component.find('Button').at(0);
      const instance = component.instance();
      expect(prevBtnEl.props()).toEqual({
        variants: ['small'],
        action: instance.goToPrevStep,
        disabled: true,
        children: 'Back',
      });
    });

    it('renders second button as "Next" Button with proper props', () => {
      const nextBtnEl = component.find('Button').at(1);
      const instance = component.instance();
      expect(nextBtnEl.props()).toEqual({
        variants: ['small'],
        action: instance.goToNextStep,
        disabled: false,
        children: 'Next',
      });
    });

    it('renders no OrderMessage element at the begining', () => {
      const orderMsgEl = component.find('OrderMessage');
      expect(orderMsgEl.exists()).toBeFalsy();
    });

    it('renders OrderMessage when errorId state is positive', () => {
      const instance = component.instance();
      instance.handleModalAction = jest.fn();
      //check errorId at the begining
      expect(instance.state.errorId).toBe(null);
      //change errorId to some positive
      const mockedErrorId = 1;

      instance.setState({
        errorId: mockedErrorId,
      });

      const orderMsgEl = component.find('OrderMessage');
      expect(orderMsgEl.exists()).toBeTruthy();
      expect(orderMsgEl.prop('message')).toBe(instance.MESSAGES[mockedErrorId]);
      expect(instance.handleModalAction).toHaveBeenCalledTimes(0);
      orderMsgEl.prop('action')();
      expect(instance.handleModalAction).toHaveBeenCalledTimes(1);
      expect(instance.handleModalAction).toHaveBeenCalledWith(mockedErrorId);
    });

    it('renders OrderMessage when isOrderError prop is true', () => {
      const propsWithOrderError = {
        ...mockedProps,
        isOrderError: true,
      };
      const compWithOrderError = shallow(<OrderPanel {...propsWithOrderError}/>);
      const instance = compWithOrderError.instance();
      
      const orderMsgEl = compWithOrderError.find('OrderMessage');
      expect(orderMsgEl.exists()).toBeTruthy();
      expect(orderMsgEl.props()).toEqual({
        message: instance.MESSAGES[4],
        action: mockedProps.resetFormState,
      });
    });

    it('renders OrderMessage when isOrderSuccess prop is true', () => {
      const propsWithSuccess = {
        ...mockedProps,
        isOrderSuccess: true,
      };
      const compWithOrderSuccess = shallow(<OrderPanel {...propsWithSuccess} />);
      const instance = compWithOrderSuccess.instance();
      const orderMsgEl = compWithOrderSuccess.find('OrderMessage');
      expect(orderMsgEl.exists()).toBeTruthy();
      expect(orderMsgEl.props()).toEqual({
        message: instance.MESSAGES[5],
        action: instance.backToMainPage,
        isSuccess: true,
      });
    });

    it('renders other message in OrderMessage when props: isOrderSuccess and isEditing are true', () => {
      const propsWithEditSuccess = {
        ...mockedProps,
        isOrderSuccess: true,
        isEditing: true,
      };
      const compWithEditSuccess = shallow(<OrderPanel {...propsWithEditSuccess} />);
      const instance = compWithEditSuccess.instance();
      const orderMsgEl = compWithEditSuccess.find('OrderMessage');
      expect(orderMsgEl.props()).toEqual({
        message: instance.MESSAGES[6],
        action: instance.backToMainPage,
        isSuccess: true,
      });
    });

    it('renders no Loader at the begining', () => {
      const loaderEl = component.find('Loader');
      expect(loaderEl.exists()).toBeFalsy();
    });

    it('renders Loader when prop isSendingOrder is true', () => {
      const propsWhenSending = {
        ...mockedProps,
        isSendingOrder: true,
      };

      const compWhenSending = shallow(<OrderPanel {...propsWhenSending}/>);
      const loaderEl = compWhenSending.find('Loader');
      expect(loaderEl.exists()).toBeTruthy();
    });
  });

  describe('functionality', () => {
    let compWithChosenSeats;
    const propsWithChosenSeats = {
      ...mockedProps,
      chosenSeats: ['1A', '2B'],
    };

    beforeEach(() => {
      component = shallow(<OrderPanel {...mockedProps}/>);
      compWithChosenSeats = shallow(<OrderPanel {...propsWithChosenSeats}/>);
    });

    it('starts with 1 orderStep state', () => {
      const instance = component.instance();
      expect(instance.state.orderStep).toBe(1);
    });

    it('avoids to go to orderStep 2 when seats are not chosen', () => {
      const compWithoutChosenSeats = component;
      const instance = compWithoutChosenSeats.instance();
      instance.goToNextStep();
      expect(instance.state.orderStep).toBe(1);
    });

    it('allows to go to orderStep 2. when seats are chosen', () => {
      const instance = compWithChosenSeats.instance();
      instance.goToNextStep();
      expect(instance.state.orderStep).toBe(2);
    });

    it('avoids to go to orderStep 3 when errors occured', () => {
      const instance = compWithChosenSeats.instance();
      instance.goToNextStep();
      expect(instance.state.orderStep).toBe(2);
      instance.setState({
        valuesErrors: {
          name: true,
        }
      });
      instance.goToNextStep();
      expect(instance.state.orderStep).toBe(2);
    });

    it('allows to go to 3. step if error is not occured', () => {
      const instance = compWithChosenSeats.instance();
      expect(instance.state.valuesErrors).toEqual({
        email: false,
        name: false,
        surname: false,
        phone: false,
      });
      instance.goToNextStep();
      instance.goToNextStep();
      expect(instance.state.orderStep).toBe(3);
    });

    it('allows to go prev step if step is higher than 1', () => {
      const instance = compWithChosenSeats.instance();
      instance.setState({
        orderStep: 3,
      });
      instance.goToPrevStep();
      expect(instance.state.orderStep).toBe(2);
      instance.goToPrevStep();
      expect(instance.state.orderStep).toBe(1);
      instance.goToPrevStep();
      expect(instance.state.orderStep).toBe(1);
    });

    it('gets state from userData', () => {
      expect(component.state()).toEqual({
        orderStep: 1,
        errorId: null,
        name: mockedUserData.name,
        surname: mockedUserData.surname,
        phone: mockedUserData.phone,
        email: mockedUserData.email,
        valuesErrors: { 
          name: false, 
          surname: false, 
          phone: false, 
          email: false },
        isFullfillFromProps: true,
        errors: { 
          email: false, 
          name: false, 
          surname: false, 
          phone: false }
      });
    });

    it('changes name state value correctly', () => {
      const instance = component.instance();
      const expectedErrorValue = 'N';
      const expectedCorrectValue = 'Newname';
      //check when error
      let e = createEventValue(expectedErrorValue);
      instance.handleChangeInputValue(e, 'name');
      expect(instance.state.name).toBe(expectedErrorValue);
      expect(instance.state.valuesErrors.name).toBe(true);
      //check when correct value
      e = createEventValue(expectedCorrectValue);
      instance.handleChangeInputValue(e, 'name');
      expect(instance.state.name).toBe(expectedCorrectValue);
      expect(instance.state.valuesErrors.name).toBe(false);
    });

    it('changes surname state value correctly', () => {
      const instance = component.instance();
      const expectedErrorValue = 'S';
      const expectedCorrectValue = 'Newsurname';
      //check when error
      let e = createEventValue(expectedErrorValue);
      instance.handleChangeInputValue(e, 'surname');
      expect(instance.state.surname).toBe(expectedErrorValue);
      expect(instance.state.valuesErrors.surname).toBe(true);
      //check when correct
      e = createEventValue(expectedCorrectValue);
      instance.handleChangeInputValue(e, 'surname');
      expect(instance.state.surname).toBe(expectedCorrectValue);
      expect(instance.state.valuesErrors.surname).toBe(false);
    });

    it('changes email state value correctly', () => {
      const instance = component.instance();
      const expectedErrorValue = 'someerroremail';
      const expectedCorrectValue = 'somenewemail@gmail.com';
      //check when error
      let e = createEventValue(expectedErrorValue);
      instance.handleChangeInputValue(e, 'email');
      expect(instance.state.email).toBe(expectedErrorValue);
      expect(instance.state.valuesErrors.email).toBe(true);
      //check when correct
      e = createEventValue(expectedCorrectValue);
      instance.handleChangeInputValue(e, 'email');
      expect(instance.state.email).toBe(expectedCorrectValue);
      expect(instance.state.valuesErrors.email).toBe(false);
    });

    it('changes phone state value correctly', () => {
      const instance = component.instance();
      const expectedErrorValue = 'some phone';
      const expectedCorrectValue = '666 666 666';
      //check when error
      let e = createEventValue(expectedErrorValue);
      instance.handleChangeInputValue(e, 'phone');
      expect(instance.state.phone).toBe(expectedErrorValue);
      expect(instance.state.valuesErrors.phone).toBe(true);
      //check when correct
      e = createEventValue(expectedCorrectValue);
      instance.handleChangeInputValue(e, 'phone');
      expect(instance.state.phone).toBe(expectedCorrectValue);
      expect(instance.state.valuesErrors.phone).toBe(false);
    });

    it('fires orderTickets with proper values when user submit order', () => {
      const mockedSeats = ['1A', '2B'];
      const propsWithSeats = {
        ...mockedProps,
        chosenSeats: mockedSeats,
      };

      const comp = shallow(<OrderPanel {...propsWithSeats}/>);
      const instance = comp.instance();
      expect(mockedProps.orderTickets).toHaveBeenCalledTimes(0);
      instance.handleSubmitOrder();
      expect(mockedProps.orderTickets).toHaveBeenCalledTimes(1);
      expect(mockedProps.orderTickets).toHaveBeenCalledWith({
        ...mockedUserData,
        seats: mockedSeats,
        showId: mockedProps.showId,
      }, mockedProps.token, undefined );
    });

    it('fires orderTickets with proper values when user submit to edit order', () => {
      const mockedSeats = ['3D', '11C'];
      const editingId = 'someId';
      const propsToOrder = {
        ...mockedProps,
        chosenSeats: mockedSeats,
        isEditing: true,
        editingId,
      };

      const comp = shallow(<OrderPanel {...propsToOrder}/>);
      const instance = comp.instance();
      expect(mockedProps.orderTickets).toHaveBeenCalledTimes(1);
      instance.handleSubmitOrder();
      expect(mockedProps.orderTickets).toHaveBeenCalledTimes(2);
      expect(mockedProps.orderTickets).toHaveBeenCalledWith({
        ...mockedUserData,
        seats: mockedSeats,
      }, mockedProps.token, editingId );
    });
  });
});