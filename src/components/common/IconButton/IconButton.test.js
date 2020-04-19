import React from 'react';
import { shallow } from 'enzyme';
import IconButton from './IconButton';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const mockedProps = {
  icon: faSearch,
  action: () => { console.log('test'); }
};

const component = shallow(<IconButton {...mockedProps}/>);

describe('IconButton component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes proper FontAwesomeIcon', () => {
    expect(component.find('FontAwesomeIcon').prop('icon')).toEqual(mockedProps.icon);
  });

  it('has action prop used in button onClick method', () => {
    const buttonEl = component.find('button');
    expect(buttonEl.exists()).toBeTruthy();
    expect(buttonEl.prop('onClick')).toBe(mockedProps.action);
  });

  it('includes disabled button when disable prop provided', () => {
    expect(component.find('button').prop('disabled')).toBeFalsy();
    const componentWithPropDisable = shallow(<IconButton {...mockedProps} disabled />);
    expect(componentWithPropDisable.find('button').prop('disabled')).toBeTruthy();
  });
});