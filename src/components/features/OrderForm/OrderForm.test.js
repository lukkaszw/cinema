import React from 'react';
import { shallow } from 'enzyme';
import OrderForm from './OrderForm';

const mockedProps = {
  name: 'Name',
  surname: 'Surname', 
  phone: '666 666 666', 
  email: 'someemail@wp.pl', 
  handleChangeInputValue: jest.fn(), 
  errors: {
    name: true,
    surname: false,
    phone: true,
    email: false,
  },
};

const component = shallow(<OrderForm {...mockedProps}/>);

describe('OrderForm component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders 4 InputFields elements', () => {
    const inputEl = component.find('InputField');
    expect(inputEl.length).toBe(4);
  });

  it('renders InputField with name value and name error as first', () => {
    const nameInputEl = component.find('InputField').at(0);
    expect(nameInputEl.prop('value')).toBe(mockedProps.name);
    expect(nameInputEl.prop('isError')).toBe(mockedProps.errors['name']);
  });

  it('renders InputField with surname value and surname error as second', () => {
    const surnameInputEl = component.find('InputField').at(1);
    expect(surnameInputEl.prop('value')).toBe(mockedProps.surname);
    expect(surnameInputEl.prop('isError')).toBe(mockedProps.errors['surname']);
  });

  it('renders InputField with phone and phone error value as third', () => {
    const phoneInputEl = component.find('InputField').at(2);
    expect(phoneInputEl.prop('value')).toBe(mockedProps.phone);
    expect(phoneInputEl.prop('isError')).toBe(mockedProps.errors['phone']);
  });

  
  it('renders InputField with email value and email error as fourth', () => {
    const emailInputEl = component.find('InputField').at(3);
    expect(emailInputEl.prop('value')).toBe(mockedProps.email);
    expect(emailInputEl.prop('isError')).toBe(mockedProps.errors['email']);
  });

  it('fires handleChangeInputValue with proper values on change event in InputField', () => {
    const inputFieldEl = component.find('InputField');
    const expectedValues = ['name', 'surname', 'phone', 'email'];
    const expectedEvent = {
      target: {
        value: 'Some new value',
      },
    };
    //check before on changes events
    let funcFiresCount = 0; 
    expect(mockedProps.handleChangeInputValue).toHaveBeenCalledTimes(funcFiresCount);
    inputFieldEl.forEach((inputField, i) => {
      inputField.prop('onChange')(expectedEvent);
      funcFiresCount++;
      expect(mockedProps.handleChangeInputValue).toHaveBeenCalledTimes(funcFiresCount);
      expect(mockedProps.handleChangeInputValue).toHaveBeenCalledWith(expectedEvent, expectedValues[i]);
    });
  });
});