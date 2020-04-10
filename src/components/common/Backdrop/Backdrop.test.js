import React from 'react';
import { shallow } from 'enzyme';
import Backdrop from './Backdrop';

const mockedProps = {
  isActive: false,
  closeAction: () => { console.log('test'); }
};

const component = shallow(<Backdrop {...mockedProps} />);

describe('Backdrop component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('has no class active by default and when isActive prop is false', () => {
    expect(component.hasClass('active')).toBeFalsy();
    const componentWithFalseIsActive = shallow(<Backdrop isActive={false} />);
    expect(componentWithFalseIsActive.hasClass('active')).toBeFalsy();
  });

  it('has class active when isActive prop is true', () => {
    const componentWithTrueIsActive = shallow(<Backdrop isActive={true} />);
    expect(componentWithTrueIsActive.hasClass('active')).toBeTruthy();
  });

  it('has closeAction prop used in div method onClick', () => {
    const divEl = component.find('div');
    expect(divEl.prop('onClick')).toBe(mockedProps.closeAction);
  });
});
