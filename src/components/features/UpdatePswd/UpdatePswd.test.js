import React from 'react';
import { shallow } from 'enzyme';
import UpdatePswd from './UpdatePswd';

const mockedProps = {
  token: 'sometoken',
  isSending: false,
  updatePswd: jest.fn(),
  resetUpdatePswdForm: jest.fn(),
};

let component = shallow(<UpdatePswd {...mockedProps}/>);

describe('UpdatePswd component', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      expect(component).toBeTruthy();
    });

    it('renders form with proper actions', () => {
      const instance = component.instance();
      const formEl = component.find('Connect(Form)');
      expect(formEl.exists()).toBeTruthy();
      expect(formEl.prop('onSubmit')).toBe(instance.handleSubmitForm);
      expect(formEl.prop('resetForm')).toBe(instance.handleResetForm);
    });

    it('renderes 3 InputFields', () => {
      const inputFieldsEl = component.find('InputField');
      expect(inputFieldsEl.length).toBe(3);
    });

    it('renders first InputField as old password with proper props', () => {
      const instance = component.instance();
      const oldPswdInputEl = component.find('InputField').at(0);
      expect(oldPswdInputEl.prop('type')).toBe('password');
      expect(oldPswdInputEl.prop('autoComplete')).toBe('true');
      expect(oldPswdInputEl.prop('placeholder')).toBe('Old password');
      expect(oldPswdInputEl.prop('value')).toBe(instance.state.oldPassword);
      expect(oldPswdInputEl.prop('isError')).toBe(instance.state.errors.oldPassword);
    });

    it('renders second InputField as password with proper props', () => {
      const instance = component.instance();
      const passwdInputEl = component.find('InputField').at(1);
      expect(passwdInputEl.prop('type')).toBe('password');
      expect(passwdInputEl.prop('autoComplete')).toBe('true');
      expect(passwdInputEl.prop('placeholder')).toBe('New password');
      expect(passwdInputEl.prop('value')).toBe(instance.state.password);
      expect(passwdInputEl.prop('isError')).toBe(instance.state.errors.password);
    });

    it('renders third InputField as old password with proper props', () => {
      const instance = component.instance();
      const confPswdInputEl = component.find('InputField').at(2);
      expect(confPswdInputEl.prop('type')).toBe('password');
      expect(confPswdInputEl.prop('autoComplete')).toBe('true');
      expect(confPswdInputEl.prop('placeholder')).toBe('Confirm new password');
      expect(confPswdInputEl.prop('value')).toBe(instance.state.confirmPassword);
      expect(confPswdInputEl.prop('isError')).toBe(instance.state.errors.confirmPassword);
    });

    it('renders one ButtonLink with link to users settings page', () => {
      const linkBtnEl = component.find('ButtonLink');
      expect(linkBtnEl.exists()).toBeTruthy();
      expect(linkBtnEl.prop('to')).toBe('/user/settings');
      expect(linkBtnEl.prop('title')).toBe('Cancel');
      expect(linkBtnEl.prop('disabled')).toBe(false);
    });

    it('renders one Button element with submit text', () => {
      const btnEl = component.find('Button');
      expect(btnEl.exists()).toBeTruthy();
      expect(btnEl.prop('variants')).toEqual(['tertiary']);
      expect(btnEl.prop('disabled')).toBe(false);

    
    });

    it('redners both ButtonLink and Button as disabled when form data is sending', () => {
      const propsWhenSending = {
        ...mockedProps,
        isSending: true,
      }
      const componentWhenSending = shallow(<UpdatePswd {...propsWhenSending}/>);
      expect(componentWhenSending.find('ButtonLink').prop('disabled')).toBe(true);
      expect(componentWhenSending.find('Button').prop('disabled')).toBe(true);
    })
  });

  describe('functionality', () => {
    let mockedUpdateFunc;
    const mockedPasswords = {
      oldPassword: 'SomeOldPassword',
      password: 'goodPassword',
      confirmPassword: 'goodPassword',
    }

    beforeEach(() => {
      mockedUpdateFunc = jest.fn();
      mockedProps.updatePswd = mockedUpdateFunc;
      component = shallow(<UpdatePswd {...mockedProps}/>);
    });

    it('changes old password value and old password error properly', () => {
      const instance = component.instance();
      expect(instance.state.oldPassword).toBe('');
      expect(instance.state.errors.oldPassword).toBe(false);
      const validChange = 'updatedoldpassword';
      const invalidChange = '';
      //check when valid change
      component.find('InputField').at(0).prop('onChange')({ target: { value: validChange }});
      expect(instance.state.oldPassword).toBe(validChange);
      expect(instance.state.errors.oldPassword).toBe(false);
       //check when invalid change
      component.find('InputField').at(0).prop('onChange')({ target: { value: invalidChange }});
      expect(instance.state.oldPassword).toBe(invalidChange);
      expect(instance.state.errors.oldPassword).toBe(true);
    });

    it('changes password value and password error properly', () => {
      const instance = component.instance();
      expect(instance.state.password).toBe('');
      expect(instance.state.errors.password).toBe(false);
      const validChange = 'password!';
      const invalidChange = 'password';
      //check when valid change
      component.find('InputField').at(1).prop('onChange')({ target: { value: validChange }});
      expect(instance.state.password).toBe(validChange);
      expect(instance.state.errors.password).toBe(false);
       //check when invalid change
      component.find('InputField').at(1).prop('onChange')({ target: { value: invalidChange }});
      expect(instance.state.password).toBe(invalidChange);
      expect(instance.state.errors.password).toBe(true);
    });

    it('changes confirmPassword value and confirmPassword error properly', () => {
      const instance = component.instance();
      expect(instance.state.confirmPassword).toBe('');
      expect(instance.state.errors.confirmPassword).toBe(false);
      const validChange = 'thesameaspassword!';
      const invalidChange = 'badconfirmpassword';
      instance.setState({
        password: validChange,
      });
      //check when valid change
      component.find('InputField').at(2).prop('onChange')({ target: { value: validChange }});
      expect(instance.state.confirmPassword).toBe(validChange);
      expect(instance.state.errors.confirmPassword).toBe(false);
       //check when invalid change
      component.find('InputField').at(2).prop('onChange')({ target: { value: invalidChange }});
      expect(instance.state.confirmPassword).toBe(invalidChange);
      expect(instance.state.errors.confirmPassword).toBe(true);
    });

    it('sends proper data when fires onSubmit event', () => {
      const instance = component.instance();
      // check the function at the begining
      expect(mockedUpdateFunc).toHaveBeenCalledTimes(0);
  
      instance.setState(mockedPasswords);
  
      component.find('Connect(Form)').prop('onSubmit')();
      expect(mockedUpdateFunc).toHaveBeenCalledTimes(1);
      expect(mockedUpdateFunc).toHaveBeenCalledWith(mockedProps.token, mockedPasswords);
    });

    it('does not fires function when user submits form if fields errors occured', () => {
      const instance = component.instance();
      expect(mockedUpdateFunc).toHaveBeenCalledTimes(0);
      const mockedFalseErrors = {
        oldPassword: false,
        password: false,
        confirmPassword: false,
      };

      Object.keys(mockedFalseErrors).forEach(key => {
        instance.setState({
          ...mockedPasswords,
          errors: {
            ...mockedFalseErrors,
            [key]: true,
          }
        });

        component.find('Connect(Form)').prop('onSubmit')();
        expect(mockedUpdateFunc).toHaveBeenCalledTimes(0);
      });
    });
  });
});