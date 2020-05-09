import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { shallow } from 'enzyme';
import SearchInput from './SearchInput';

const mockedProps = {
  value: 'test value',
  onChange: () => console.log('onChange'),
  onSubmit: () => console.log('onSubmit'),
  placeholder: 'test placeholder',
};

const component = shallow(<SearchInput {...mockedProps} />)

describe('SearchInput component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes form with proper submit action', () => {
    const formEl = component.find('form');
    expect(formEl.exists()).toBeTruthy();
    expect(formEl.prop('onSubmit')).toEqual(mockedProps.onSubmit);
  });

  it('includes input in form with proper props', () => {
    const inputEl = component.find('form input');
    expect(inputEl.exists()).toBeTruthy();
    expect(inputEl.prop('value')).toBe(mockedProps.value);
    expect(inputEl.prop('onChange')).toBe(mockedProps.onChange);
  });

  it('includes search icon button in form', () => {
    const iconBtnX = component.find('form IconButton');
    expect(iconBtnX.exists()).toBeTruthy();
    expect(iconBtnX.prop('icon')).toEqual(faSearch);
  });

  
});