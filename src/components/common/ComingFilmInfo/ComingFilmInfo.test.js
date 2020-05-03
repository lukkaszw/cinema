import React from 'react';
import { shallow } from 'enzyme';
import ComingFilmInfo from './ComingFilmInfo';

const mockedProps = {
  playDate: '01.01.1970',
};

const component = shallow(<ComingFilmInfo {...mockedProps}/>);

describe('ComingFilmInfo component', () => {  
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes info about coming date', () => {
    const infoEl = component.find('.info');
    expect(infoEl.exists()).toBeTruthy();
    const expectedText = `Available from ${mockedProps.playDate}!`;
    expect(infoEl.text()).toBe(expectedText);
  });

  it('includes text coming soon in info if playDate prop is not provided', () => {
    const component2 = shallow(<ComingFilmInfo />);
    const infoEl = component2.find('.info');
    expect(infoEl.exists()).toBeTruthy();
    const expectedText = 'Coming soon!';
    expect(infoEl.text()).toBe(expectedText);
  });
});