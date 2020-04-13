import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader';

const mockedProps = {
  classes: ['red', 'big'],
};

const component = shallow(<Loader {...mockedProps}/>);

describe('Loader component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes 8 dots elements', () => {
    expect(component.find('.dot').length).toBe(8);
  });

  it(`includes classes: ${mockedProps.classes.join(', ')}`, () => {
    const [firstClass, secondClass] = mockedProps.classes;
    expect(component.hasClass(firstClass)).toBeTruthy();
    expect(component.hasClass(secondClass)).toBeTruthy();
  });
});