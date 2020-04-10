import React from 'react';
import { shallow } from 'enzyme';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import IconLink from './IconLink';

const mockedProps = {
  outside: true,
  circle: true,
  to: 'http://test.com',
  icon: faSearch,
  specialClass: 'test-class',
};

const component = shallow(<IconLink {...mockedProps}/>);
const componentWithOutsideFalse = shallow(<IconLink to={mockedProps.to} icon={mockedProps.icon}/>);

describe('IconLink', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it(`includes a tag when outside prop is true with href prop set as ${mockedProps.to} and target="__blank"`, () => {
    const aLinkEl = component.find('a');
    expect(aLinkEl.exists()).toBeTruthy();
    expect(aLinkEl.prop('href')).toBe(mockedProps.to);
    expect(aLinkEl.prop('target')).toBe('__blank');
  });

  it(`includes Link element when outside prop is false with to prop set as ${mockedProps.to}`, () => {
    expect(componentWithOutsideFalse).toBeTruthy();
    const linkEl = componentWithOutsideFalse.find('Link');
    expect(linkEl.exists()).toBeTruthy();
    expect(linkEl.prop('to')).toBe(mockedProps.to);
  });

  it('includes FontAwesomeIcon with proper icon prop', () => {
    const iconEl = component.find('FontAwesomeIcon');
    expect(iconEl.exists()).toBeTruthy();
    expect(iconEl.prop('icon')).toBe(mockedProps.icon);
  });
  
  it('has class circle when prop circle is true', () => {
    expect(component.find('a').hasClass('circle')).toBeTruthy();
  });

  it('has not class circle when prop circle is false', () => {
    expect(componentWithOutsideFalse.find('.circle').exists()).toBeFalsy();
  });

  it('has special class provided in prop specialClass', () => {
    expect(component.find('a').hasClass(mockedProps.specialClass)).toBeTruthy();
  });

  it('has no special class when specialClass prop is not provided', () => {
    expect(componentWithOutsideFalse.find(`.${mockedProps.specialClass}`).exists()).toBeFalsy();
  });
});