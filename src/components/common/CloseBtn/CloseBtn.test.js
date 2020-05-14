import React from 'react';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { shallow } from 'enzyme';
import CloseBtn from './CloseBtn';

const mockedProps = {
  closeAction: () => console.log('close action'),
};

const component = shallow(<CloseBtn {...mockedProps}/>);

describe('CloseBtn component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes icon button with proper props', () => {
    const iconBtnEl = component.find('IconButton');
    expect(iconBtnEl.exists()).toBeTruthy();
    expect(iconBtnEl.props()).toEqual({
      icon: faWindowClose,
      action: mockedProps.closeAction,
    });
  });
});