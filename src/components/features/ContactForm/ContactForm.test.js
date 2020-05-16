import React from 'react';
import { shallow } from 'enzyme';
import ContactForm from './ContactForm';

const mockedProps = {
  sendData: jest.fn(),
  emailErrorMsg: '',
  messageErrorMsg: '',
}

const mockedPropsWithErrors = {
  ...mockedProps,
  emailErrorMsg: 'Email error!', 
  messageErrorMsg: 'Message error!',
}

const component = shallow(<ContactForm {...mockedProps}/>);
const componentWithErrors = shallow(<ContactForm {...mockedPropsWithErrors}/>);

describe('ContactForm component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
    expect(componentWithErrors).toBeTruthy();
  });

  it('renders input field with proper value after mount', () => {
    const inputFieldEl = component.find('InputField');
    expect(inputFieldEl.exists()).toBeTruthy();
    expect(inputFieldEl.prop('value')).toBe('');
    
  });

  it('changes input value on event change', () => {
      const expectedText = 'new input text';
      component.find('InputField').prop('onChange')({ target: { value: expectedText }});
      expect(component.find('InputField').prop('value')).toBe(expectedText);
  });

  it('renders textarea field with proper value after mount', () => {
    const textareaFieldEl = component.find('TextareaField');
    expect(textareaFieldEl.exists()).toBeTruthy();
    expect(textareaFieldEl.prop('value')).toBe('');
  });

  it('changes textarea field on evet change', () => {
    const expectedText = 'new textarea text';
    component.find('TextareaField').prop('onChange')({ target: { value: expectedText }});
    expect(component.find('TextareaField').prop('value')).toBe(expectedText);
  });

  it('renders form element connected to redux', () => {
    expect(component.find('Connect(Form)').exists()).toBeTruthy();
  });

  it('fires sendData function from props with proper value on ', () => {
    const expectedData = { email: 'dummyemail@gmail.com', message: 'dummy message' }
    //change data of input and textarea
    component.find('InputField').prop('onChange')({ target: { value: expectedData.email }});
    component.find('TextareaField').prop('onChange')({ target: { value: expectedData.message }});
    expect(mockedProps.sendData).toHaveBeenCalledTimes(0);
    component.find('Connect(Form)').prop('onSubmit')();
    expect(mockedProps.sendData).toHaveBeenCalledTimes(1);
    expect(mockedProps.sendData).toHaveBeenCalledWith(expectedData);
  });

  it('renders input and textarea without error if error messages are not provided', () => {
    expect(component.find('InputField').prop('isError')).toBe(false);
    expect(component.find('TextareaField').prop('isError')).toBe(false);
  });

  it('renders input and textarea with error if error messages are provided', () => {
    expect(componentWithErrors.find('InputField').prop('isError')).toBe(true);
    expect(componentWithErrors.find('InputField').prop('message')).toBe(mockedPropsWithErrors.emailErrorMsg);
    expect(componentWithErrors.find('TextareaField').prop('isError')).toBe(true);
    expect(componentWithErrors.find('TextareaField').prop('message')).toBe(mockedPropsWithErrors.messageErrorMsg);
  });
});