import React from 'react';
import { mount } from 'enzyme';
import ErrorMessage from './ErrorMessage';

const mockedProps = {
  message: 'Error!',
  btnTitle: 'Button',
  action: () => console.log('error message action'),
};

const component = mount(<ErrorMessage {...mockedProps} />);

describe('ErrorMessage component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });  

  it('includes message', () => {
    expect(component.find('.message').text()).toBe(mockedProps.message);
  })

  it('includes button with proper action and button title', () => {
    const btnEl = component.find('Button');
    expect(btnEl.exists()).toBeTruthy();
    expect(btnEl.text()).toBe(mockedProps.btnTitle);
    expect(btnEl.prop('action')).toBe(mockedProps.action);
  });
});