import React from 'react';
import { shallow } from 'enzyme';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import FormMessage from './FormMessage';

const mockedPropsWhenSuccess = {
  isError: false,
  message: 'Some message',
  resetMessage: jest.fn(),
};

const mockedPropsWhenError = {
  ...mockedPropsWhenSuccess,
  isError: true,
}

const componentWhenSuccess = shallow(<FormMessage {...mockedPropsWhenSuccess} />);
const componentWhenError = shallow(<FormMessage {...mockedPropsWhenError} />);

describe('FormMessage component', () => {
  it('renders without crashing', () => {
    expect(componentWhenSuccess).toBeTruthy();
    expect(componentWhenError).toBeTruthy();
  });

  it('renders proper message text', () => {
    expect(componentWhenSuccess.find('.message').text()).toBe(mockedPropsWhenSuccess.message);
    expect(componentWhenError.find('.message').text()).toBe(mockedPropsWhenError.message);
  });

  it('renders proper confirm icon button', () => {
    const confirmBtnEl = componentWhenSuccess.find('Button');
    expect(confirmBtnEl.exists()).toBeTruthy();
    expect(confirmBtnEl.prop('action')).toBe(mockedPropsWhenSuccess.resetMessage);
    expect(confirmBtnEl.prop('children')).toBe('Ok');
  });

  it('renders proper sign icon when error occured', () => {
    const iconWhenError = componentWhenError.find('.sign FontAwesomeIcon');
    expect(iconWhenError.exists()).toBeTruthy();
    expect(iconWhenError.prop('icon')).toEqual(faTimes);
  });

  it('renders proper sign icon when error is not occured', () => {
    const iconWhenSuccess = componentWhenSuccess.find('.sign FontAwesomeIcon');
    expect(iconWhenSuccess.exists()).toBeTruthy();
    expect(iconWhenSuccess.prop('icon')).toEqual(faCheck);
  });
});