import React from 'react';
import { shallow } from 'enzyme';
import UserSettingsButtons from './UserSettingsButtons';

const mockedProps = {
  handleStartEditMode: jest.fn(),
};

const component = shallow(<UserSettingsButtons {...mockedProps} />);

describe('UserSettingsButtons component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders "Edit" Button with proper props', () => {
    const editBtnEl = component.find('Button');
    expect(editBtnEl.length).toBe(1);
    expect(editBtnEl.props()).toEqual({
      action: mockedProps.handleStartEditMode,
      variants: ['small', 'secondary'],
      children: 'Edit',
    });
  }); 

  it('renders two ButtonLinks with proper props', () => {
    const btnsLinksEl = component.find('ButtonLink');
    expect(btnsLinksEl.length).toBe(2);

    expect(btnsLinksEl.at(0).props()).toEqual({
      to: '/user/settings/up',
      size: 'small',
      variant: 'fourth',
      title: 'Update password!',
    });

    expect(btnsLinksEl.at(1).props()).toEqual({
      to: '/user/settings/delete',
      size: 'small',
      title: 'Delete account',
    });
  });
});