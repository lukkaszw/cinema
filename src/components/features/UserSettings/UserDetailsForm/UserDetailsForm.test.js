import React from 'react';
import { shallow } from 'enzyme';
import UserDetailsForm from './UserDetailsForm';

const mockedProps = {
  handleSubmitForm: jest.fn(), 
  handleResetForm:  jest.fn(), 
  handleChangeInputValue: jest.fn(), 
  handleGetsNewsletter:  jest.fn(),
  email: 'someemail@wp.pl', 
  name: '', 
  surname: '', 
  phone: '', 
  getsNewsletter: false, 
  data: {
    email: 'someemail@wp.pl',
    name: 'Somename',
    surname: 'Somesurname',
    phone: '111 111 111',
    getsNewsletter: true,
  },
  isSending: false, 
  errors: {
    email: false,
    name: false,
    surname: false,
    phone: false,
  },
  isEditing: false, 
  handleCancelEditMode: jest.fn(), 
};

const component = shallow(<UserDetailsForm {...mockedProps} />);

describe('UserDetailsForm component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders Form with proper actions', () => {
    const formEl = component.find('Connect(Form)');
    expect(formEl.prop('onSubmit')).toBe(mockedProps.handleSubmitForm);
    expect(formEl.prop('resetForm')).toBe(mockedProps.handleResetForm);
  });

  it('renders 4 inputFields', () => {
    const inputFieldEl = component.find('InputField');
    expect(inputFieldEl.length).toBe(4);
  });

  
  it('renders first InputField as email with proper props', () => {
    const emailInputEl = component.find('InputField').at(0);
    expect(emailInputEl.prop('id')).toBe('email');
    expect(emailInputEl.prop('value')).toBe(mockedProps.email);
    expect(emailInputEl.prop('isPassive')).toBe(true);
    expect(emailInputEl.prop('disabled')).toBe(true);
    expect(emailInputEl.prop('isError')).toBe(false);
  });

  it('renders second InputField as name with proper props', () => {
    const nameInputEl = component.find('InputField').at(1);
    expect(nameInputEl.prop('id')).toBe('name');
    expect(nameInputEl.prop('value')).toBe(mockedProps.data.name);
    expect(nameInputEl.prop('isPassive')).toBe(true);
    expect(nameInputEl.prop('disabled')).toBe(true);
    expect(nameInputEl.prop('isError')).toBe(false);
  });

  it('renders third InputField as surname with proper props', () => {
    const nameInputEl = component.find('InputField').at(2);
    expect(nameInputEl.prop('id')).toBe('surname');
    expect(nameInputEl.prop('value')).toBe(mockedProps.data.surname);
    expect(nameInputEl.prop('isPassive')).toBe(true);
    expect(nameInputEl.prop('disabled')).toBe(true);
    expect(nameInputEl.prop('isError')).toBe(false);
  });

  it('renders fourth InputField as phone with proper props', () => {
    const nameInputEl = component.find('InputField').at(3);
    expect(nameInputEl.prop('id')).toBe('phone');
    expect(nameInputEl.prop('value')).toBe(mockedProps.data.phone);
    expect(nameInputEl.prop('isPassive')).toBe(true);
    expect(nameInputEl.prop('disabled')).toBe(true);
    expect(nameInputEl.prop('isError')).toBe(false);
  });

  it('renders one checkbox with proper props', () => {
    const checkboxEl = component.find('Checkbox');
    expect(checkboxEl.props()).toEqual({
      value: 'newsletter',
      toggleAction: mockedProps.handleGetsNewsletter,
      checked: mockedProps.getsNewsletter,
      text: 'I want to receive newsletters',
      isPassive: true,
      disabled: true,
    });
  });

  it('renders input fields as passive and disabled in not editing mode and not passive, not disabled in editing mode', () => {

    let inputFieldsEl = component.find('InputField');
    inputFieldsEl.forEach(inpEl => {
      expect(inpEl.prop('isPassive')).toBe(true);
      expect(inpEl.prop('disabled')).toBe(true);
    });

    const propsForEditMode = {
      ...mockedProps,
      isEditing: true,
    };

    const componentInEditMode = shallow(<UserDetailsForm {...propsForEditMode} />);

    inputFieldsEl = componentInEditMode.find('InputField');
    inputFieldsEl.forEach(inpEl => {
      expect(inpEl.prop('isPassive')).toBe(false);
      expect(inpEl.prop('disabled')).toBe(false);
    });
  });

  it('renders no Buttons in non-editing mode', () => {
    const btnEditEl = component.find('Button');
    expect(btnEditEl.length).toBe(0);
  });

  it('renders two buttons "Cancel" and "Submit" in editing node', () => {
    const propsWhenEditing = {
      ...mockedProps,
      isEditing: true,
    };

    const componentWhenEditing = shallow(<UserDetailsForm {...propsWhenEditing} />);

    const btnsEl = componentWhenEditing.find('Button');
    expect(btnsEl.length).toBe(2);
    expect(btnsEl.at(0).props()).toEqual({
      action: mockedProps.handleCancelEditMode,
      disabled: false,
      children: 'Cancel',
      variants: [],
    });
    expect(btnsEl.at(1).props()).toEqual({
      variants: ['tertiary'],
      disabled: false,
      children: 'Submit',
    });
  });

  it('renders buttons Cancel and Submit as disabled when user is sending data', () => {
    const propsWhenSending = {
      ...mockedProps,
      isEditing: true,
      isSending: true,
    };

    const compWhenSending = shallow(<UserDetailsForm {...propsWhenSending}/>);

    const btnsEl = compWhenSending.find('Button');
    expect(btnsEl.length).toBe(2);
    expect(btnsEl.at(0).prop('disabled')).toBe(true);
    expect(btnsEl.at(1).prop('disabled')).toBe(true);
  });
});
