import React from 'react';
import { shallow } from 'enzyme';
import SignUser from './SignUser';
import constants from './constants';

const mockedProps = {
  isSending: false,
  isError: false,
  isSuccess: false,
  resetForm: () => jest.fn(),
  message: '',
  sendCredentials: jest.fn(),
  goToOtherPanel: () => jest.fn(),
};

const mockedPropsForRegister = {
  ...mockedProps,
  isForRegister: true,
};

const componentForLogin = shallow(<SignUser {...mockedProps}/>);
const componentForRegister = shallow(<SignUser {...mockedPropsForRegister} />);

describe('Signin component', () => {
  it('renders without crashing', () => {
    expect(componentForLogin).toBeTruthy();
    expect(componentForRegister).toBeTruthy();
  });

  it('renders AuthForm with proper props', () => {
    const instance = componentForLogin.instance();
    const authFormEl = componentForLogin.find('AuthForm');
    expect(authFormEl.exists()).toBeTruthy();
    expect(authFormEl.props()).toEqual({
      isSending: mockedProps.isSending,
      isSendingError: mockedProps.isError,
      isSendingSuccess: mockedProps.isSuccess,
      requestResponse: mockedProps.message,
      queryAction: mockedProps.goToOtherPanel,
      errors: {
        login: instance.state.errors.login,
        password: instance.state.errors.password,
      },
      login: instance.state.login,
      password: instance.state.password,
      btnTitle: instance.constants.BUTTON_TITLE,
      onSubmit: instance.handleSubmitForm,
      query: instance.constants.QUERY,
      queryBtn: instance.constants.BTN_QUERY,
      type: instance.constants.TYPE,
      title: instance.constants.FORM_TITLE,
      confirmedPassword: instance.state.confirmPassword,
      onChangeConfirmPassword: instance.handleConfirmPassword,
      onChangeLogin: instance.handleChangeLogin,
      onChangePassword: instance.handleChangePassword,
      resetForm: instance.handleResetForm
    })
  });

  it('generates proper constants at start', () => {
    const instanceForLogin = componentForLogin.instance();
    const instanceForRegister = componentForRegister.instance();

    expect(instanceForLogin.constants).toEqual(constants.login);
    expect(instanceForRegister.constants).toEqual(constants.register);
  });

  it('generates special methods about confirm password for registration', () => {
    const instanceForLogin = componentForLogin.instance();
    const instanceForRegister = componentForRegister.instance();

    expect(typeof instanceForLogin.handleConfirmPassword).toBe('undefined');
    expect(typeof instanceForLogin.state.confirmPassword).toBe('undefined');
    expect(typeof instanceForRegister.handleConfirmPassword).toBe('function');
    expect(typeof instanceForRegister.state.confirmPassword).toBe('string');
  });

  it('changes state of login in proper way', () => {
    const instance = componentForRegister.instance();
    //check state at the begining
    expect(instance.state.login).toBe('');
    //simulate action
    const changedLogin = 'updated login';
    instance.handleChangeLogin({ target: { value: changedLogin } });
    //check value again
    expect(instance.state.login).toBe(changedLogin);
  });

  it('changes state of password in proper way', () => {
    const instance = componentForRegister.instance();
    //check state at the begining
    expect(instance.state.password).toBe('');
    //simulate action
    const changedPassword = 'updated password';
    instance.handleChangePassword({ target: { value: changedPassword } });
    //check value again
    expect(instance.state.password).toBe(changedPassword);
  });

  it('changes state of confirmPassword in proper way', () => {
    const instance = componentForRegister.instance();
    //check state at the begining
    expect(instance.state.confirmPassword).toBe('');
    //simulate action
    const changedConfirmPassword = 'updated password';
    instance.handleConfirmPassword({ target: { value: changedConfirmPassword } });
    //check value again
    expect(instance.state.confirmPassword).toBe(changedConfirmPassword);
  });

  describe('check errors handling', () => {
    let instance;

    const checkSendingCredentials = (mFunc, isAbleToSend, withExpectedValues) => {
      instance.handleSubmitForm();
      const sendTimes = isAbleToSend ? 1 : 0;
      expect(mFunc).toHaveBeenCalledTimes(sendTimes);
      if(withExpectedValues) {
        expect(mFunc).toHaveBeenCalledWith(withExpectedValues);
      }
    }

    it('reacts in proper way for errors in component version for login', () => {
      const mockedFunc = jest.fn();
      mockedProps.sendCredentials = mockedFunc;

      const newComponentForLogin = shallow(<SignUser {...mockedProps}/>);
     
      instance = newComponentForLogin.instance();
      
      const checkErrors = (login, password) => {
        expect(instance.state.errors).toEqual({
          login,
          password,
        });
      }
      //check errors start state
      checkErrors(false, false);
      checkSendingCredentials(mockedFunc, false);

      //change email address incorrectly
      const inValidEmail = 'dummyemail.pl';
      instance.handleChangeLogin({ target: { value: inValidEmail } });
      //despite that email was not correct error should not appear,
      // because in login version user should already know what he is typing
      checkErrors(false, false);
      checkSendingCredentials(mockedFunc, false);
      //change password
      const inValidPassword = 'badpass';
      instance.handleChangePassword({ target: { value: inValidPassword } });
      //despite that password was not correct error should not appear
      checkErrors(false, false);
    const expectedCredentials = {
        login: inValidEmail,
        password: inValidPassword,
      };
      checkSendingCredentials(mockedFunc, true, expectedCredentials);
    });
  
    it('reacts in proper way for errors in component version for register', () => {
      const mockedFunc2 = jest.fn();
      mockedPropsForRegister.sendCredentials = mockedFunc2;

      const newComponentForRegister = shallow(<SignUser {...mockedPropsForRegister} />);
  
      instance = newComponentForRegister.instance();
      //helper functions
      const checkErrors = (login, password, confirmPassword) => {
        expect(instance.state.errors).toEqual({
          login,
          password,
          confirmPassword,
        });
      }
  
      //check errors start state
      checkErrors(false, false, false);
      //errors do not occure but we should not be able to send data because they are empty
      checkSendingCredentials(mockedFunc2, false);
  
      //change login
      const inValidEmail = 'dummyemail.pl';
      const validEmail = 'goodemail@wp.pl';
      //change email address incorrectly
      instance.handleChangeLogin({ target: { value: inValidEmail } });
      //login error should appear
      checkErrors(true, false, false);
      checkSendingCredentials(mockedFunc2, false);
      //change email correctly
      instance.handleChangeLogin({ target: { value: validEmail } });
      //login error should disappear
      checkErrors(false, false, false);
      checkSendingCredentials(mockedFunc2, false);
  
      //change password
      const inValidPassword = 'invpass';
      const validPassword = 'goodpassword!';
      //change password incorrectly
      instance.handleChangePassword({ target: { value: inValidPassword } });
      //password error should appear
      checkErrors(false, true, false);
      checkSendingCredentials(mockedFunc2, false);
  
      //change password correctly
      instance.handleChangePassword({ target: { value: validPassword } });
      //password error should disappear
      checkErrors(false, false, false);
      checkSendingCredentials(mockedFunc2, false);
  
      //change confirm password
      const inValidConfirmPassword = 'someinvalid';
      const validConfirmPassword = 'goodpassword!'; // the same as password before which is current set
      //change confirmPassword incorrectly
      instance.handleConfirmPassword({ target: { value: inValidConfirmPassword } });
      //confirmPassword error should appear
      checkErrors(false, false, true);
      checkSendingCredentials(mockedFunc2, false);
      // change confirmPassword correctly
      instance.handleConfirmPassword({ target: { value: validConfirmPassword } });
      //confirmPassword error should disappear
      checkErrors(false, false, false);
      const expectedValues = {
        login: validEmail,
        password: validPassword,
        confirmPassword: validConfirmPassword,
      };
      checkSendingCredentials(mockedFunc2, true, expectedValues);
    });
  });

  // handleResetForm = () => {
  //   if(this.props.isSuccess) {
  //     this.resetFormFields();
  //     this.props.goToOtherPanel();    
  //   }
  //   this.props.resetForm();
  // }


  describe('reset form', () => {
    it('fires only resetForm from props while reseting form whend sending form was not succeded', () => {
      mockedPropsForRegister.resetForm = jest.fn();
      mockedPropsForRegister.goToOtherPanel = jest.fn();
      const newCompForRegister = shallow(<SignUser {...mockedPropsForRegister} />);
      const instance = newCompForRegister.instance();
      instance.resetFormFields = jest.fn();
      
      //check after mount
      expect(mockedPropsForRegister.resetForm).toHaveBeenCalledTimes(0);
      expect(mockedPropsForRegister.goToOtherPanel).toHaveBeenCalledTimes(0);
      expect(instance.resetFormFields).toHaveBeenCalledTimes(0);

      //simulate reset form
      instance.handleResetForm();
      expect(mockedPropsForRegister.resetForm).toHaveBeenCalledTimes(1);
      expect(mockedPropsForRegister.goToOtherPanel).toHaveBeenCalledTimes(0);
      expect(instance.resetFormFields).toHaveBeenCalledTimes(0);
    });

    it('fires resetForm, goToOtherPanel from props and resetFormFields while reseting form whend sending form was succeded', () => {
      mockedPropsForRegister.resetForm = jest.fn();
      mockedPropsForRegister.goToOtherPanel = jest.fn();
      mockedPropsForRegister.isSuccess = true;
      const newCompForRegister = shallow(<SignUser {...mockedPropsForRegister} />);
      const instance = newCompForRegister.instance();
      instance.resetFormFields = jest.fn();
      
      //check after mount
      expect(mockedPropsForRegister.resetForm).toHaveBeenCalledTimes(0);
      expect(mockedPropsForRegister.goToOtherPanel).toHaveBeenCalledTimes(0);
      expect(instance.resetFormFields).toHaveBeenCalledTimes(0);

      //simulate reset form
      instance.handleResetForm();
      expect(mockedPropsForRegister.resetForm).toHaveBeenCalledTimes(1);
      expect(mockedPropsForRegister.goToOtherPanel).toHaveBeenCalledTimes(1);
      expect(instance.resetFormFields).toHaveBeenCalledTimes(1);
    });

    it('resets fields properly', () => {
      const instance = componentForRegister.instance();
      //set start values
      instance.state = {
        login: 'some dummy email',
        password: 'some dummy password',
        confirmPassword: 'some dummy confirmpassword',
        errors: {
          login: true,
          password: true,
          confirmPassword: true,
        },
      };

      instance.resetFormFields();

      expect(instance.state).toEqual({
        login: '',
        password: '',
        confirmPassword: '',
        errors: {
          login: false,
          password: false,
          confirmPassword: false,
        },
      });
    });
  });
});