import React from 'react';
import { shallow } from 'enzyme';
import PageEntryImg from './PageEntryImg';

const mockedProps = {
  img: 'image.jpg',
  title: 'Title',
};

const component = shallow(<PageEntryImg {...mockedProps}/>);

describe('PageEntryImg component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes title with proper text', () => {
    const titleEl = component.find('.title');
    expect(titleEl.exists()).toBeTruthy();
  });

  it('includes image with proper props', () => {
    const imageEl = component.find('.photo');
    expect(imageEl.exists()).toBeTruthy();
    expect(imageEl.prop('src')).toBe(mockedProps.img);
  });

  it('includes extra portrait image if prop imgPortrait is provided', () => {
    expect(component.find('picture source').exists()).toBeFalsy();
    const expectedImg = '/portrait-image.jpg';
    const componentWithPortraitImg = shallow(<PageEntryImg {...mockedProps} imagePortrait={expectedImg} />);
    const prictureSourceEl = componentWithPortraitImg.find('picture source');
    expect(prictureSourceEl.exists()).toBeTruthy();
    expect(prictureSourceEl.prop('srcSet')).toBe(expectedImg);
  });
});