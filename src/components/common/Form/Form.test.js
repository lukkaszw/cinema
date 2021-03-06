import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';

const MockedComponent = () => <div></div>;

const mockedProps = {
  onSubmit: jest.fn(),
  isSending: false,
  isError: false,
  isSuccess: false,
  message: 'Some message',
  resetForm: jest.fn(),
};

const component = shallow(<Form {...mockedProps}><MockedComponent /></Form>);

describe('Form component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders children inside form', () => {
    expect(component.find('form MockedComponent').exists()).toBeTruthy();
  });

  it('fires onSubmit function from prop when user submit form', () => {
    expect(mockedProps.onSubmit).toHaveBeenCalledTimes(0);
    component.find('form').prop('onSubmit')({ preventDefault: () => {} });
    expect(mockedProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders LoaderIndicator with proper isLoading prop', () => {
    expect(component.find('LoaderIndicator').prop('isActive')).toBe(mockedProps.isSending);
  });

  it('renders FormMessage componment only when sending is successful and when error occured', () => {
    expect(component.find('FormMessage').exists()).toBeFalsy();

    const mockedPropsWhenSuccess = {
      ...mockedProps,
      isSuccess: true,
    };

    const componentWhenSuccess = shallow(<Form {...mockedPropsWhenSuccess}><MockedComponent /></Form>);
    let formMsgEl = componentWhenSuccess.find('FormMessage');
    expect(formMsgEl.exists()).toBeTruthy();
    const expectedPropsWhenSuccess = {
      isError: false,
      resetMessage: mockedProps.resetForm,
      message: mockedProps.message,
    };
    expect(formMsgEl.props()).toEqual(expectedPropsWhenSuccess);

    const mockedPropsWhenError = {
      ...mockedProps,
      isError: true,
    }

    const componentWhenError = shallow(<Form {...mockedPropsWhenError}><MockedComponent /></Form>);
    formMsgEl = componentWhenError.find('FormMessage');
    expect(formMsgEl.exists()).toBeTruthy();
    const expectedPropsWhenError = {
      ...expectedPropsWhenSuccess,
      isError: true,
    };
    expect(formMsgEl.props()).toEqual(expectedPropsWhenError);
  });
});