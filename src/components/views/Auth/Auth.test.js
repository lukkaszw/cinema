import React from 'react';
import { shallow } from 'enzyme';
import Auth from './Auth';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/auth"
  })
}));

const mockedProps = {
  isAuthenticated: false,
  resetFormState: () => console.log('reset form state'),
};

const propsWhenAuthenticated = {
  ...mockedProps,
  isAuthenticated: true,
};

const component = shallow(<Auth {...mockedProps} />);

describe('AuthForm component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders two SignUser panels - first for register and second for login', () => {
    const signUserPanelEL = component.find('Connect(SignUser)');
    expect(signUserPanelEL.length).toBe(2);
    expect(signUserPanelEL.at(0).prop('isForRegister')).toBe(undefined);
    expect(signUserPanelEL.at(1).prop('isForRegister')).toBe(true);
  });

  it('changes the forms panel position correctly', () => {
    const signInEl = component.find('Connect(SignUser)').at(0);
    const signUpEl = component.find('Connect(SignUser)').at(1);

    //check panel start position
    expect(component.find('.formsPanel').prop('style')).toEqual({
      transform: 'translateX(-0%)',
    });

    //simulate to change the panel position
    signInEl.prop('goToOtherPanel')();
    expect(component.find('.formsPanel').prop('style')).toEqual({
      transform: 'translateX(-50%)',
    });

    //simulate to change again panel position
    signUpEl.prop('goToOtherPanel')()
    expect(component.find('.formsPanel').prop('style')).toEqual({
      transform: 'translateX(-0%)',
    });
  });

  it('does not renders Redirect to "/auth/success" when user is not authenticated', () => {
    expect(component.find('Redirect').exists()).toBeFalsy();
  });

  it('does renders Redirect to "/auth/success" when user is authenticated', () => {

    const componentWhenAuth = shallow(<Auth {...propsWhenAuthenticated} />);
    const redirectEl = componentWhenAuth.find('Redirect');
    expect(redirectEl.exists()).toBeTruthy();
    expect(redirectEl.prop('to')).toBe('/auth/success');
  });
});