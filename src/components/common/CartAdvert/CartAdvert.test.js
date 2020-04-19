import React from 'react';
import { shallow } from 'enzyme';
import CartAdvert from './CartAdvert';

const mockedProps = {
  image: '/image.jpg',
  title: 'Image',
}

const component = shallow(<CartAdvert {...mockedProps}/>);

describe('CartAdvert component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes image with proper props', () => {
    const imageEl = component.find('.img');
    expect(imageEl.prop('src')).toBe(mockedProps.image);
    expect(imageEl.prop('alt')).toBe(mockedProps.title);
  });
});