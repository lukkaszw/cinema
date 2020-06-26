import React from 'react';
import { shallow } from 'enzyme';
import Courtains from './Courtains';

const mockedProps = {
  isActive: false,
};

const component = shallow(<Courtains {...mockedProps} />);

describe('Courtains component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders root element without active class', () => {
    const rootEl = component.find('.root');
    expect(rootEl.length).toBe(1);
    expect(rootEl.hasClass('active')).toBe(false);
  });

  it('renders root element with active class when isActive prop is true', () => {
    const activeProps = {
      isActive: true,
    };

    const activeComp = shallow(<Courtains {...activeProps} />);

    const rootEl = activeComp.find('.root');
    expect(rootEl.hasClass('active')).toBe(true);
  });

  it('renders two courtains left and right', () => {
    expect(component.find('.leftCourtain').length).toBe(1);
    expect(component.find('.rightCourtain').length).toBe(1);
  });
});
