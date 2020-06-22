import React from 'react';
import { shallow } from 'enzyme';
import TextareaField from './TextareaField';

const mockedProps = {
  value: 'text',
  onChange: jest.fn(),
  placeholder: 'some placeholder',
  message: 'message',
};

const propsToCheckMaxChars = {
  ...mockedProps,
  value: 'ab',
  maxChars: 1,
};

const component = shallow(<TextareaField  {...mockedProps}/>)
const compWithMaxChars = shallow(<TextareaField {...propsToCheckMaxChars} />);

describe('TextareaField component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
    expect(compWithMaxChars).toBeTruthy();
  });

  it('has class error if isError prop is provided', () => {
    expect(component.find('div').hasClass('error')).toBeFalsy();
    const compWithError = shallow(<TextareaField {...mockedProps} isError />);
    expect(compWithError.find('div').hasClass('error')).toBeTruthy();
  });

  it('has class error if value text chave more chars than number maxChars prop', () => {
    expect(component.find('div').hasClass('error')).toBeFalsy();
    expect(compWithMaxChars.find('div').hasClass('error')).toBeTruthy();
  });

  describe('Textarea element', () => {
    it('renders textarea element with proper props', () => {
      const textareaEl = component.find('textarea');
      expect(textareaEl.exists()).toBeTruthy();
      expect(textareaEl.props()).toEqual({
        'aria-label': 'some placeholder',
        value: mockedProps.value,
        onChange: mockedProps.onChange,
        placeholder: mockedProps.placeholder,
      });
    });

    
    it('fires onChange prop function on change event', () => {
      expect(mockedProps.onChange).toHaveBeenCalledTimes(0);
      component.find('textarea').prop('onChange')();
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
      const compWithoutMsg = shallow(<TextareaField {...propsWithoutMsg}/>);
      expect(compWithoutMsg.find('.message').exists()).toBeFalsy();
    });
  });

  describe('Max chars element', () => {
    it('does not render max chars element when max chars element is not provided', () => {
      expect(component.find('.maxChars').exists()).toBeFalsy();
      const maxCharsEl = compWithMaxChars.find('.maxChars');
      expect(maxCharsEl.exists()).toBeTruthy();
      const expectedMsg = `${propsToCheckMaxChars.value.length}/${propsToCheckMaxChars.maxChars}`;
      expect(maxCharsEl.text()).toBe(expectedMsg);
    });
  });
});