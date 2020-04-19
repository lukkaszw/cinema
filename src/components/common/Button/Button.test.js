import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

const mockedFunc = () => {};

describe('Button component', () => {
  it('renders without crashing', () => {
    const component = shallow(<Button action={mockedFunc}>Button</Button>);
    expect(component).toBeTruthy();
  });

  it('includes button with proper text and proper action', () => {
    const expectedText = 'Test text';
  const component = shallow(<Button action={mockedFunc}>{expectedText}</Button>);
    const buttonEl = component.find('button');
    expect(buttonEl.length).toBe(1);
    expect(buttonEl.text()).toBe(expectedText);
    expect(buttonEl.prop('onClick')).toBe(mockedFunc);
  });

  it('includes button with proper classes', () => {
    const expectedClasses = ['inline', 'big'];
    const component = shallow(<Button action={mockedFunc} classes={expectedClasses}>Button</Button>);
    const buttonEl = component.find('button');
    expect(buttonEl.hasClass(expectedClasses[0]));
    expect(buttonEl.hasClass(expectedClasses[1]));
  });
});