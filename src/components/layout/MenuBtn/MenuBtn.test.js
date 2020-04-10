import React from 'react';
import { shallow } from 'enzyme';
import MenuBtn from './MenuBtn';

const mockedPropsActive = {
  isActive: true,
  toggleAction: () => {},
};

const component = shallow(<MenuBtn {...mockedPropsActive}/>);

describe('MenuBtn component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes class active when prop isActive is true', () => {
    expect(component.hasClass('active')).toBeTruthy();
  });

  it('does not include class active when prop isActive is false', () => {
    const componentWithFalseIsActive = shallow(<MenuBtn isActive={false} toggleAction={mockedPropsActive.toggleAction}/>);
    expect(componentWithFalseIsActive.hasClass('active')).toBeFalsy();
  });
});