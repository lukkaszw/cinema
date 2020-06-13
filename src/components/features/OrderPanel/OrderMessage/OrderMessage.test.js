import React from 'react';
import { shallow } from 'enzyme';
import OrderMessage from './OrderMessage';

const mockedProps = {
  message: 'Some order message!',
  action: jest.fn(),
};

const component = shallow(<OrderMessage {...mockedProps}/>);

describe('OrderMessage component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders proper message', () => {
    const msgEl = component.find('.message');
    expect(msgEl.text()).toBe(mockedProps.message);
  });

  it('renders Button with proper props', () => {
    const btnEl = component.find('Button');
    expect(btnEl.props()).toEqual({
      action: mockedProps.action,
      children: 'Ok',
      variants: [null],
    });
  });

  it('renders tertiary Button when isSuccess prop is provided', () => {
    const propsSuccess = {
      ...mockedProps,
      isSuccess: true,
    };

    const compWhenSuccess = shallow(<OrderMessage {...propsSuccess}/>);
    const btnEl = compWhenSuccess.find('Button');
    expect(btnEl.props()).toEqual({
      action: mockedProps.action,
      children: 'Ok',
      variants: ['tertiary'],
    });
  });
});