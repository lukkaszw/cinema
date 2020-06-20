import React from 'react';
import { shallow } from 'enzyme';
import UserSettings from './UserSettings';

const mockedData = {
  email: 'someemail@gmail.com',
  name: 'Name',
  surname: 'Surname',
  phone: '666 666 666',
  getsNewsletter: false,
}

const mockedProps = {
  token: 'sometoken',
  updateUserData: jest.fn(),
  isSending: false,
  data: mockedData,
  resetUpdateForm: jest.fn(),
};

let component;

describe('UserSettings component', () => {

  describe('rendering', () => {
    beforeEach(() => {
      component = shallow(<UserSettings {...mockedProps} />);
    });

    it('renders without crashing', () => {
      expect(component).toBeTruthy();
    });

    it('redners UserDetailsForm with proper props', () => {
      const instance = component.instance();
      const userDetailsFormEl = component.find('UserDetailsForm');
      expect(userDetailsFormEl.length).toBe(1);
      expect(userDetailsFormEl.props()).toEqual({
        handleSubmitForm: instance.handleSubmitForm, 
        handleResetForm: instance.handleResetForm, 
        handleChangeInputValue: instance.handleChangeInputValue, 
        handleGetsNewsletter: instance.handleGetsNewsletter,
        handleCancelEditMode: instance.handleCancelEditMode, 
        email: instance.state.email, 
        name: instance.state.name, 
        surname: instance.state.surname, 
        phone: instance.state.phone, 
        getsNewsletter: instance.state.getsNewsletter, 
        data: mockedProps.data,
        isSending: mockedProps.isSending, 
        errors: instance.state.errors,
        isEditing: instance.state.isEditing, 
      });

    });
  });

  describe('functionality', () => {
    beforeEach(() => {
      mockedProps.updateUserData = jest.fn();

      component = shallow(<UserSettings {...mockedProps} />);
    });
    
    it('changes editing mode properly', () => {
      const instance = component.instance();
      expect(instance.state.isEditing).toBe(false);
      //click on button edit - on the begining btn edit is renered
      instance.handleStartEditMode();
      expect(instance.state.isEditing).toBe(true);
      //click on button cancel - in edit mode button cancel and submit are renered
      const mockedEvent = { preventDefault: () => {}};
      instance.handleCancelEditMode(mockedEvent);
      expect(instance.state.isEditing).toBe(false);
    });

    it('changes state values when props has an data with email so when data were downloaded', () => {
      //now in props we have data with email - email is always in data because it is a login so data were downloaded
      const instance = component.instance();
      expect(instance.state).toEqual({
        email: 'someemail@gmail.com',
        name: 'Name',
        surname: 'Surname',
        phone: '666 666 666',
        getsNewsletter: false,
        isFullfillFromProps: true,
        isEditing: false,
        errors: {
          email: false,
          name: false,
          surname: false,
          phone: false,
        }
      });
    });

    it('reseting form state before component is unmounted', () => {
      const instance = component.instance();
      expect(mockedProps.resetUpdateForm).toHaveBeenCalledTimes(0);
      instance.componentWillUnmount();
      expect(mockedProps.resetUpdateForm).toHaveBeenCalledTimes(1);
    });

    it('changes input fields values state in proper way', () => {
      const instance = component.instance();
      instance.handleStartEditMode()
      expect(instance.state.isEditing).toBe(true);

      const expectedValue = 'sadqwaxadwq';
      const mockedEvent = { target: { value: expectedValue }};

      const fields = ['email', 'name', 'surname', 'phone'];
      fields.forEach(fieldName => {
        instance.handleChangeInputValue(mockedEvent, fieldName);
        expect(instance.state[fieldName]).toBe(expectedValue);
      });
    });

    it('checks errors in proper way', () => {
      const mockedData = {
        email: {
          valid: 'validemail@wp.pl',
          invalid: 'invalidemail',
        },
        name: {
          valid: 'Aga',
          invalid: '',
        },
        surname: {
          valid: 'Surname',
          invalid: '',
        },
        phone: {
          valid: '606 222 111',
          invalid: 'dadaw1414 2',
        },
      };

      const fields = ['email', 'name', 'surname', 'phone'];
      const instance = component.instance();
      instance.handleStartEditMode();
      //check errors at the begining
      fields.forEach(fieldName => {
        expect(instance.state.errors[fieldName]).toBe(false);
      });

      //use invalid data
      fields.forEach(fieldName => {
        const mockedEvent = { target: { value: mockedData[fieldName].invalid}};
        instance.handleChangeInputValue(mockedEvent, fieldName);
        expect(instance.state.errors[fieldName]).toBe(true);
      });

      //use valid data
      fields.forEach(fieldName => {
        const mockedEvent = { target: { value: mockedData[fieldName].valid}};
        instance.handleChangeInputValue(mockedEvent, fieldName);
        expect(instance.state.errors[fieldName]).toBe(false);
      });
    });

    it('changes getsNewsletter state in proper way', () => {
      const instance = component.instance();
      instance.handleStartEditMode();
      expect(instance.state.getsNewsletter).toBe(false);
      instance.handleGetsNewsletter();
      expect(instance.state.getsNewsletter).toBe(true);
      instance.handleGetsNewsletter();
      expect(instance.state.getsNewsletter).toBe(false);
    });

    it('sends data when errors are not occured', () => {

      const stateWithNoErrors = {
        ...mockedData,
        errors: {
          email: false,
          name: false,
          surname: false,
          phone: false,
        }
      }

      const instance = component.instance();
      instance.setState(stateWithNoErrors);
      //check start state of updateUserData function
      expect(mockedProps.updateUserData).toHaveBeenCalledTimes(0);

      //check state after on submit with good data
      instance.handleSubmitForm();
      expect(mockedProps.updateUserData).toHaveBeenCalledTimes(1);
      expect(mockedProps.updateUserData).toHaveBeenCalledWith(mockedProps.token, mockedData);
    });

    it('does not send data when errors are occured', () => {
      const mockedNoErrors = {
        email: false,
        name: false,
        surname: false,
        phone: false,
      };

      const checkedFields = ['email', 'name', 'surname', 'phone'];

      const instance = component.instance();
      instance.handleStartEditMode();

      //check start state of updateUserData function
      expect(mockedProps.updateUserData).toHaveBeenCalledTimes(0);

      checkedFields.forEach(field => {
        instance.setState({
          ...mockedData,
          errors: {
            ...mockedNoErrors,
            [field]: true,
          },
        });

        //check updateUserData function state after on submit when one error occured
        instance.handleSubmitForm();
        expect(mockedProps.updateUserData).toHaveBeenCalledTimes(0);
      });

    });
  });
});
