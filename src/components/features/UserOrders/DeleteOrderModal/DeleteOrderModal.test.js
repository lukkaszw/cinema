import React from 'react';
import { shallow } from 'enzyme';
import DeleteOrderModal from './DeleteOrderModal';

const mockedProps = {
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
  isSending: false, 
  isError: false, 
  isSuccess: false,
};

const propsWhenSending = {
  ...mockedProps,
  isSending: true,
};

const propsWhenSuccess = {
  ...mockedProps,
  isSuccess: true,
};

const propsWhenError = {
  ...mockedProps,
  isError: true,
}

const component = shallow(<DeleteOrderModal {...mockedProps}/>);
const componentWhenSending = shallow(<DeleteOrderModal {...propsWhenSending} />);
const componentWhenError = shallow(<DeleteOrderModal {...propsWhenError} />);
const componentWhenSuccess = shallow(<DeleteOrderModal {...propsWhenSuccess} />);

describe('DeleteOrderModal component', () => {
  describe('component whith no actions', () => {
    it('renders without crashing', () => {
      expect(component).toBeTruthy();
    });

    it('renders message with proper question', () => {
      const msgEl = component.find('.message');
      expect(msgEl.text()).toBe('Are you sure you want to delete this order?');
    });

    it('renders LoaderIndicator with proper isActive prop', () => {
      expect(component.find('LoaderIndicator').prop('isActive')).toBe(false);
    });

    it('renders two Buttons with proper props', () => {
      const btnsEl = component.find('Button');
      expect(btnsEl.length).toBe(2);

      expect(btnsEl.at(0).props()).toEqual({
        variants: ['tertiary'],
        action: mockedProps.onCancel,
        disabled: false,
        children: 'No',
      });

      expect(btnsEl.at(1).props()).toEqual({
        variants: [],
        action: mockedProps.onConfirm,
        disabled: false,
        children: 'Yes',
      });
    });
  });

  describe('component when sending', () => {
    it('renders without crashing', () => {
      expect(componentWhenSending).toBeTruthy();
    });

    it('renders message with proper question', () => {
      const msgEl = componentWhenSending.find('.message');
      expect(msgEl.text()).toBe('Are you sure you want to delete this order?');
    });

    
    it('renders LoaderIndicator with proper isActive prop', () => {
      expect(componentWhenSending.find('LoaderIndicator').prop('isActive')).toBe(true);
    });

    it('renders two Buttons with proper props', () => {
      const btnsEl = componentWhenSending.find('Button');
      expect(btnsEl.length).toBe(2);

      expect(btnsEl.at(0).props()).toEqual({
        variants: ['tertiary'],
        action: mockedProps.onCancel,
        disabled: true,
        children: 'No',
      });

      expect(btnsEl.at(1).props()).toEqual({
        variants: [],
        action: mockedProps.onConfirm,
        disabled: true,
        children: 'Yes',
      });
    });
  });

  describe('component when success', () => {
    it('renders without crashing', () => {
      expect(componentWhenSuccess).toBeTruthy();
    });

    it('renders message with proper sentence', () => {
      const msgEl = componentWhenSuccess.find('.message');
      expect(msgEl.text()).toBe('Success - the order has been deleted!');
    });

    it('renders LoaderIndicator with proper isActive prop', () => {
      expect(componentWhenSuccess.find('LoaderIndicator').prop('isActive')).toBe(false);
    });
    
    it('renders one Button with proper props', () => {
      const btnEl = componentWhenSuccess.find('Button');
      expect(btnEl.length).toBe(1);
      expect(btnEl.props()).toEqual({
        variants: ['tertiary'],
        action: mockedProps.onCancel,
        children: 'Ok',
      });
    });
  });

  describe('component when error', () => {
    it('redners without crashing', () => {
      expect(componentWhenError).toBeTruthy();
    });

    it('renders message with proper sentence', () => {
      const msgEl = componentWhenError.find('.message');
      expect(msgEl.text()).toBe('Error - the order has not been deleted! Please try again later!');
    });

    it('renders LoaderIndicator with proper isActive prop', () => {
      expect(componentWhenError.find('LoaderIndicator').prop('isActive')).toBe(false);
    });
   
    it('renders one Button with proper props', () => {
      const btnEl = componentWhenError.find('Button');
      expect(btnEl.length).toBe(1);
      expect(btnEl.props()).toEqual({
        variants: [null],
        action: mockedProps.onCancel,
        children: 'Ok',
      });
    });
  });
});