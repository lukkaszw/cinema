import React from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { shallow } from 'enzyme';
import SearchedByItem from './SearchedByItem';

const mockedProps = {
  value: 'test value',
  removeAction: () => console.log('action'),
};

const component = shallow(<SearchedByItem {...mockedProps} />);

describe('SearchByItem component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes proper text', () => {
    expect(component.find('.text').text()).toBe(mockedProps.value);
  });

  it('includes "x" button with proper action', () => {
    const iconBtnEl = component.find('IconButton');
    expect(iconBtnEl.prop('icon')).toEqual(faTimesCircle);
    expect(iconBtnEl.prop('action')).toEqual(mockedProps.removeAction);
  })
});