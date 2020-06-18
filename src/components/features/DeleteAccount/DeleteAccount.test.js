import React from 'react';
import { shallow } from 'enzyme';
import DeleteAccount from './DeleteAccount';

const mockedProps = {
  token: 'someToken',
  onDeleteAccount: jest.fn(),
  onLogout: jest.fn(),
  onResetForm: jest.fn(),
  isDeleting: false,
  isSuccess: false,
  isError: false,
};

const propsWhenDeleting = {
  ...mockedProps,
  isDeleting: true,
};

const propsWhenSuccess = {
  ...mockedProps,
  isSuccess: true,
};

const propsWhenError = {
  ...mockedProps,
  isError: true,
}

const component = shallow(<DeleteAccount {...mockedProps}/>);
const componentWhenDeleting = shallow(<DeleteAccount {...propsWhenDeleting} />);
const componentWhenSuccess = shallow(<DeleteAccount {...propsWhenSuccess} />);
const componentWhenError = shallow(<DeleteAccount {...propsWhenError} />);

describe('DeleteAccount component', () => {
  describe('rednering', () => {
    it('renders without crashing', () => {
      expect(component).toBeTruthy();
      expect(componentWhenDeleting).toBeTruthy();
      expect(componentWhenSuccess).toBeTruthy();
      expect(componentWhenError).toBeTruthy();
    });
  
    it('renders proper question message', () => {
      const msgEl = component.find('.message');
      expect(msgEl.text()).toBe('Do you really want to delete your account? Your account is irrecoverable!');
    });
  
    it('renders one ButtonLink "No" and one Button "Yes" with proper props', () => {
      const btnLinkEl = component.find('ButtonLink');
      expect(btnLinkEl.length).toBe(1);
      expect(btnLinkEl.props()).toEqual({
        to: "/user/settings",
        size: "small",
        variant: "tertiary",
        title: "No",
        disabled: false,
      });
  
      const btnEl = component.find('Button');
      expect(btnEl.length).toBe(1);
      expect(btnEl.prop('children')).toBe('Yes');
      expect(btnEl.prop('variants')).toEqual(['small']);
      expect(btnEl.prop('disabled')).toBe(false);
    });

    it('renders LoaderIndicator with proper isActive prop', () => {
      expect(componentWhenDeleting.find('LoaderIndicator').prop('isActive')).toBe(true);
      expect(componentWhenSuccess.find('LoaderIndicator').prop('isActive')).toBe(false);
      expect(componentWhenError.find('LoaderIndicator').prop('isActive')).toBe(false);
    });

    it('redners two buttons as before when deleting is on but they are disabled', () => {
      const btnLinkEl = componentWhenDeleting.find('ButtonLink');
      expect(btnLinkEl.length).toBe(1);
      expect(btnLinkEl.props()).toEqual({
        to: "/user/settings",
        size: "small",
        variant: "tertiary",
        title: "No",
        disabled: true,
      });
  
      const btnEl = componentWhenDeleting.find('Button');
      expect(btnEl.length).toBe(1);
      expect(btnEl.prop('children')).toBe('Yes');
      expect(btnEl.prop('variants')).toEqual(['small']);
      expect(btnEl.prop('disabled')).toBe(true);
    });

    it('renders other message when error occured', () => {
      const msgEl = componentWhenError.find('.message');
      expect(msgEl.text()).toBe('Error. We are not able to delete your account now! Please try again later.');
    });

    it('renders one ButtonLink "Ok" with proper props and 0 Buttons when error occured', () => {
      const btnLinkEl = componentWhenError.find('ButtonLink');
      expect(btnLinkEl.length).toBe(1);
      expect(btnLinkEl.props()).toEqual({
        to: "/user/settings",
        size: "small",
        title: "Ok",
      });

      const btnEl = componentWhenError.find('Button');
      expect(btnEl.exists()).toBeFalsy();
    });

    it('renders other message when deleting was successfull', () => {
      const msgEl = componentWhenSuccess.find('.message');
      expect(msgEl.text()).toBe('Your account has been deleted!');
    });

    it('renders one Button "Ok" and 0 ButtonLinks when deleting was successfull', () => {
      const btnEl = componentWhenSuccess.find('Button');
      expect(btnEl.length).toBe(1);
      expect(btnEl.prop('children')).toBe('Ok')
      expect(btnEl.prop('variants')).toEqual(['small', 'tertiary']);

      const btnLinkEl = componentWhenSuccess.find('ButtonLink');
      expect(btnLinkEl.exists()).toBeFalsy();
    });
  });

  describe('functionality', () => {
    it('fires onDeleteAccount function with proper value when click on Button "Yes"', () => {
      const btnYesEl = component.find('Button');
      expect(mockedProps.onDeleteAccount).toHaveBeenCalledTimes(0);
      btnYesEl.prop('action')();
      expect(mockedProps.onDeleteAccount).toHaveBeenCalledTimes(1);
      expect(mockedProps.onDeleteAccount).toHaveBeenCalledWith(mockedProps.token);
    });

    it('fires onLogout function when "Ok" button is clicked after successfull deleting', () => {
      const btnOkEl = componentWhenSuccess.find('Button');
      expect(mockedProps.onLogout).toHaveBeenCalledTimes(0);
      btnOkEl.prop('action')();
      expect(mockedProps.onLogout).toHaveBeenCalledTimes(1);
    });
  });

});