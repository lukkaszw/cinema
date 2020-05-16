import React from 'react';
import { shallow } from 'enzyme';
import InputField from './InputField';

const mockedProps = {
  onChange: jest.fn(),
  value: 'some text',
  message: 'Some message',
  placeholder: 'Some placeholder',
};

const component = shallow(<InputField {...mockedProps} />);

describe('InputField component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('has class error if isError prop is provided', () => {
    expect(component.find('div').hasClass('error')).toBeFalsy();
    const compWithError = shallow(<InputField {...mockedProps} isError />);
    expect(compWithError.find('div').hasClass('error')).toBeTruthy();
  });

  describe('Input element', () => {
    it('renders input with proper props', () => {
      const inputEl = component.find('input');
      expect(inputEl.exists()).toBeTruthy();
      expect(inputEl.props()).toEqual({
        value: mockedProps.value,
        placeholder: mockedProps.placeholder,
        onChange: mockedProps.onChange,
        type: 'text',
      });
    });

    it('has different type according to type prop', () => {
      const compWithVariantEmail = shallow(<InputField {...mockedProps} type="email" />);
      expect(compWithVariantEmail.find('input').prop('type')).toBe('email');
      const compWithVariantNumber = shallow(<InputField {...mockedProps} type="number" />);
      expect(compWithVariantNumber.find('input').prop('type')).toBe('number');
    });

    it('fires onChange prop function on change event', () => {
      expect(mockedProps.onChange).toHaveBeenCalledTimes(0);
      component.find('input').prop('onChange')();
      expect(mockedProps.onChange).toHaveBeenCalledTimes(1);
    });

  });

  describe('Message element', () => {
    it('renders message element with proper text if message prop is provided', () => {
      const messageEl = component.find('.message');
      expect(messageEl.exists()).toBeTruthy();
      expect(messageEl.text()).toBe(mockedProps.message);
    });

    it('does not render message element if message prop is not provided', () => {
      const propsWithoutMsg = {
        ...mockedProps,
        message: null,
      };
      const compWithoutMsg = shallow(<InputField {...propsWithoutMsg}/>);
      expect(compWithoutMsg.find('.message').exists()).toBeFalsy();
    });
  });
});
