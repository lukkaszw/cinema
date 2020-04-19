import React from 'react';
import { shallow } from 'enzyme';
import ButtonsList from './ButtonsList';

const mockedProps = {
  buttons: [
    {
      key: 1,
      value: 'value test 1',
      title: 'Button 1',
    },
    {
      key: 2,
      value: 'value test 2',
      title: 'Button 2',
    },
    {
      key: 3,
      value: 'value test 3',
      title: 'Button 3',
    },
  ],
  action: (value) => {},
  value: null,
}

const component = shallow(<ButtonsList {...mockedProps} />);

describe('ButtonsList component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders buttons properly', () => {
    const buttonsEl = component.find('.btnItem Button');
    expect(buttonsEl.length).toBe(mockedProps.buttons.length);
  });

  it('has buttons with classes gray depends on component value property', () => {
    mockedProps.buttons.forEach((button, index) => {
      const component = shallow(<ButtonsList {...mockedProps} value={button.value} />);
      const buttonsEl = component.find('.btnItem Button');
      expect(buttonsEl.at(index).prop('variants')).toEqual([null]);
      for(let i = 0; i < buttonsEl.length; i++) {
        if(i !== index) {
          expect(buttonsEl.at(i).prop('variants')).toEqual(['gray']);
        }
      }
    });
  });
});