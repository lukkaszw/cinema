import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from './Checkbox';

const mockedProps = {
  value: 'test-value',
  text: 'Test text',
  checked: false,
  toggleAction: jest.fn(),
};

const component = shallow(<Checkbox {...mockedProps} />);

describe('Checkbox component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes input checkbox element with proper id', () => {
    const checkBoxEl = component.find('input[type="checkbox"]');
    expect(checkBoxEl.exists()).toBeTruthy();
    expect(checkBoxEl.prop('id')).toBe(mockedProps.value);
    expect(checkBoxEl.prop('checked')).toBe(false);
  });

 

  it('includes label element with proper text nad htmlFor prop', () => {
    const labelEl = component.find('label');
    expect(labelEl.exists()).toBeTruthy();
    expect(labelEl.text()).toBe(mockedProps.text);
    expect(labelEl.prop('htmlFor')).toBe(mockedProps.value);
  });

  it('includes checkbox with proper checked mark', () => {
    expect(component.find('input[type="checkbox"]').prop('checked')).toBe(false);
    const mockedPropsForChecked = {
      ...mockedProps,
      checked: true,
    };

    const componentWithChecked = shallow(<Checkbox {...mockedPropsForChecked} />);
    expect(componentWithChecked.find('input[type="checkbox"]').prop('checked')).toBe(true);
  });

  it('fires toggleAction with good value', () => {
    const inputEl = component.find('input[type="checkbox"]');
    inputEl.prop('onChange')();
    expect(mockedProps.toggleAction).toHaveBeenCalledTimes(1);
    expect(mockedProps.toggleAction).toHaveBeenCalledWith(mockedProps.value);
  });
});
