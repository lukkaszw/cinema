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

    it('renders Form with proper actions', () => {
      const instance = component.instance();
      const formEl = component.find('Connect(Form)');
      expect(formEl.prop('onSubmit')).toBe(instance.handleSubmitForm);
      expect(formEl.prop('resetForm')).toBe(instance.handleResetForm);
    });

    it('renders 4 inputFields', () => {
      const inputFieldEl = component.find('InputField');
      expect(inputFieldEl.length).toBe(4);
    });

    it('renders first InputField as email with proper props', () => {
      const instance = component.instance();
      const emailInputEl = component.find('InputField').at(0);
      expect(emailInputEl.prop('id')).toBe('email');
      expect(emailInputEl.prop('value')).toBe(instance.state.email);
      expect(emailInputEl.prop('isPassive')).toBe(true);
      expect(emailInputEl.prop('disabled')).toBe(true);
      expect(emailInputEl.prop('isError')).toBe(instance.state.errors.email);
    });

    it('renders second InputField as name with proper props', () => {
      const instance = component.instance();
      const nameInputEl = component.find('InputField').at(1);
      expect(nameInputEl.prop('id')).toBe('name');
      expect(nameInputEl.prop('value')).toBe(instance.state.name);
      expect(nameInputEl.prop('isPassive')).toBe(true);
      expect(nameInputEl.prop('disabled')).toBe(true);
      expect(nameInputEl.prop('isError')).toBe(instance.state.errors.name);
    });

    it('renders third InputField as surname with proper props', () => {
      const instance = component.instance();
      const nameInputEl = component.find('InputField').at(2);
      expect(nameInputEl.prop('id')).toBe('surname');
      expect(nameInputEl.prop('value')).toBe(instance.state.surname);
      expect(nameInputEl.prop('isPassive')).toBe(true);
      expect(nameInputEl.prop('disabled')).toBe(true);
      expect(nameInputEl.prop('isError')).toBe(instance.state.errors.surname);
    });

    it('renders fourth InputField as phone with proper props', () => {
      const instance = component.instance();
      const nameInputEl = component.find('InputField').at(3);
      expect(nameInputEl.prop('id')).toBe('phone');
      expect(nameInputEl.prop('value')).toBe(instance.state.phone);
      expect(nameInputEl.prop('isPassive')).toBe(true);
      expect(nameInputEl.prop('disabled')).toBe(true);
      expect(nameInputEl.prop('isError')).toBe(instance.state.errors.phone);
    });

    it('renders one checkbox with proper props', () => {
      const instance = component.instance();
      const checkboxEl = component.find('Checkbox');
      expect(checkboxEl.props()).toEqual({
        value: 'newsletter',
        toggleAction: instance.handleGetsNewsletter,
        checked: instance.state.getsNewsletter,
        text: 'I want to receive newsletters',
        isPassive: true,
        disabled: true,
      });
    });

    it('renders input fields as passive and disabled in not editing mode and not passive, not disabled in editing mode', () => {
      const instance = component.instance();
      expect(instance.state.isEditing).toBe(false);

      let inputFieldsEl = component.find('InputField');
      inputFieldsEl.forEach(inpEl => {
        expect(inpEl.prop('isPassive')).toBe(true);
        expect(inpEl.prop('disabled')).toBe(true);
      });

      instance.handleStartEditMode();
      expect(instance.state.isEditing).toBe(true);

      inputFieldsEl = component.find('InputField');
      inputFieldsEl.forEach(inpEl => {
        expect(inpEl.prop('isPassive')).toBe(false);
        expect(inpEl.prop('disabled')).toBe(false);
      });
    });

    it('renders only one Button "Edit" and two ButtonLinks: "Update password", "DeleteAccount" in non-editing mode', () => {
      const instance = component.instance();
      expect(instance.state.isEditing).toBe(false);
      const btnEditEl = component.find('Button');
      expect(btnEditEl.length).toBe(1);
      expect(btnEditEl.prop('action')).toBe(instance.handleStartEditMode);
      expect(btnEditEl.prop('variants')).toEqual(['small', 'secondary']);
      expect(btnEditEl.prop('children')).toBe('Edit');

      const btnLinkEl = component.find('ButtonLink');
      expect(btnLinkEl.length).toBe(2);
      expect(btnLinkEl.at(0).props()).toEqual({
        to: '/user/settings/up',
        size: 'small',
        variant: 'fourth',
        title: 'Update password!',
      });
      expect(btnLinkEl.at(1).props()).toEqual({
        to: '/user/settings/delete',
        size: 'small',
        title: 'Delete account',
      });
    });

    it('renders only two buttons "Cancel" and "Submit" in editing node', () => {
      const instance = component.instance();
      expect(instance.state.isEditing).toBe(false);
      instance.handleStartEditMode();
      expect(instance.state.isEditing).toBe(true);

      const btnsEl = component.find('Button');
      expect(btnsEl.length).toBe(2);
      expect(btnsEl.at(0).props()).toEqual({
        action: instance.handleCancelEditMode,
        disabled: false,
        children: 'Cancel',
        variants: [],
      });
      expect(btnsEl.at(1).props()).toEqual({
        variants: ['tertiary'],
        disabled: false,
        children: 'Submit',
      });

      const btnLinkEl = component.find('ButtonLink');
      expect(btnLinkEl.length).toBe(0);
    });

    it('renders buttons Cancel and Submit as disabled when user is sending data', () => {
      const propsWhenSending = {
        ...mockedProps,
        isSending: true,
      };

      const compWhenSending = shallow(<UserSettings {...propsWhenSending}/>);

      const instance = compWhenSending.instance();
      instance.handleStartEditMode();

      const btnsEl = compWhenSending.find('Button');
      expect(btnsEl.length).toBe(2);
      expect(btnsEl.at(0).prop('disabled')).toBe(true);
      expect(btnsEl.at(1).prop('disabled')).toBe(true);
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
      const buttonEditEl = component.find('Button');
      buttonEditEl.prop('action')();
      expect(instance.state.isEditing).toBe(true);
      //click on button cancel - in edit mode button cancel and submit are renered
      const buttonCancelEl = component.find('Button').at(0);
      buttonCancelEl.prop('action')({ preventDefault: () => {}});
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

    it('reseting form state when before component is unmounted', () => {
      const instance = component.instance();
      expect(mockedProps.resetUpdateForm).toHaveBeenCalledTimes(0);
      instance.componentWillUnmount();
      expect(mockedProps.resetUpdateForm).toHaveBeenCalledTimes(1);
    });

    it('changes inputs state in proper way', () => {
      const instance = component.instance();
      instance.handleStartEditMode()
      const mockedValue = 'some value';
      const fields = ['email', 'name', 'surname', 'phone'];
      const inputFieldEl = component.find('InputField');
      inputFieldEl.forEach((inputEl, i) => {
        expect(instance.state[fields[i]]).not.toBe(mockedValue);
        inputEl.prop('onChange')({ target: { value: mockedValue }});
        expect(instance.state[fields[i]]).toBe(mockedValue);
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
      fields.forEach((field, i) => {
        expect(instance.state.errors[fields[i]]).toBe(false);
      });

      //use invalid data
      const inputFieldsEl = component.find('InputField');
      inputFieldsEl.forEach((inputEl, i) => {
        const invalidValue = mockedData[fields[i]].invalid;
        inputEl.prop('onChange')({ target: { value: invalidValue }});
        expect(instance.state.errors[fields[i]]).toBe(true);
      });

      //use valid data
      inputFieldsEl.forEach((inputEl, i) => {
        const validValue = mockedData[fields[i]].valid;
        inputEl.prop('onChange')({ target: { value: validValue }});
        expect(instance.state.errors[fields[i]]).toBe(false);
      });
    });

    it('changes getsNewsletter state in proper way', () => {
      const instance = component.instance();
      instance.handleStartEditMode();
      const checkboxEl = component.find('Checkbox');

      expect(instance.state.getsNewsletter).toBe(false);
      checkboxEl.prop('toggleAction')();
      expect(instance.state.getsNewsletter).toBe(true);
      checkboxEl.prop('toggleAction')();
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
      const formEl = component.find('Connect(Form)');
      formEl.prop('onSubmit')();
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
        component.find('Connect(Form)').prop('onSubmit')();
        expect(mockedProps.updateUserData).toHaveBeenCalledTimes(0);
      });

    });
  });
});
