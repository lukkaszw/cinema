import React from 'react';
import { shallow } from 'enzyme';
import AuthForm from './AuthForm';

const mockedProps = {
  errors: {
    login: false,
    password: false,
    confirmPassword: false,
  },
  isSending: false,
  isSendingError: false,
  isSendingSuccess: false,
  requestResponse: '',
  login: 'someemail@gmail.com',
  password: 'password22',
  onChangeLogin: jest.fn(),
  onChangePassword: jest.fn(),
  onSubmit: jest.fn(),
  title: 'Sign in to your account!',
  btnTitle: 'Sign in',
  query: 'Some query!',
  queryBtn: 'Some query button',
  queryAction: () => console.log('query action'),
  resetForm: () => console.log('reset form'),
}

const component = shallow(<AuthForm {...mockedProps}/>);

describe('LoginForm component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders h2 title element with proper text', () => {
    const h2TitleEl = component.find('h2.title');
    expect(h2TitleEl.exists()).toBeTruthy();
    expect(h2TitleEl.text()).toBe(mockedProps.title);
  });

  it('renders two InputFields with proper props', () => {
    const inputField = component.find('InputField');
    const loginEl = inputField.at(0);
    const passwordEl = inputField.at(1);

    expect(inputField.length).toBe(2);
    //check login props
    expect(loginEl.props()).toEqual({
      value: mockedProps.login,
      onChange: mockedProps.onChangeLogin,
      placeholder: 'Your email address',
      type: 'email',
      autoComplete: "on",
      isError: false,
    });
    //check password props
    expect(passwordEl.props()).toEqual({
      value: mockedProps.password,
      onChange: mockedProps.onChangePassword,
      placeholder: 'Your password',
      message: null,
      type: 'password',
      autoComplete: "on",
      isError: false,
    });
  });

  it('renders third input field for confirming password if form is for register', () => {
    const expectedConfirmation = "some confirmation of password";
    const expectedActionForConfirmation = () => console.log('change confirm');

    const componentForRegister = shallow(
      <AuthForm 
        {...mockedProps}
        type="register"
        confirmedPassword={expectedConfirmation}
        onChangeConfirmPassword={expectedActionForConfirmation}
      />
    )

    const thirdInputField = componentForRegister.find('InputField').at(2);
    expect(thirdInputField.exists()).toBeTruthy();
    expect(thirdInputField.props()).toEqual({
      value: expectedConfirmation,
      onChange: expectedActionForConfirmation,
      placeholder: 'Confirm your password',
      type: 'password',
      autoComplete: "on",
      isError: false,
    });
  });

  it('renders Form element with proper onSubmit action and sending', () => {
    const formEl = component.find('Form');
    expect(formEl.exists()).toBeTruthy();
    expect(formEl.prop('onSubmit')).toBe(mockedProps.onSubmit);
    expect(formEl.prop('isSending')).toBe(mockedProps.isSending);
  });

  it('renders button element with proper text', () => {
    const btnEl = component.find('Button').at(0);
    expect(btnEl.exists()).toBeTruthy();
    expect(btnEl.childAt(0).text()).toBe(mockedProps.btnTitle);
    expect(btnEl.prop('disabled')).toBe(false);
  });

  it('renders proper query', () => {
    const queryEl = component.find('.query p');
    expect(queryEl.text()).toBe(mockedProps.query);
  });

  it('renders second button with proper props and text', () => {
    const btnEl = component.find('Button').at(1);
    expect(btnEl.exists()).toBeTruthy();
    expect(btnEl.props()).toEqual({
      variants: ['small', 'secondary'],
      action: mockedProps.queryAction,
      children: 'Some query button',
      disabled: false,
    });
  });
});