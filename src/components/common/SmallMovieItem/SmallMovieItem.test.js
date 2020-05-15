import React from 'react';
import { shallow } from 'enzyme';
import SmallMovieItem from './SmallMovieItem';

const mockedProps = {
  _id: '1',
  title: 'Title 1',
  smallImg: 'image.jpg',
  played: 'current',
  closeAction: () => console.log('close action'),
};

const component = shallow(<SmallMovieItem {...mockedProps} />);

describe('SmallMovieItem component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders proper link to movie page with proper function', () => {
    const expectedLink = `/movies/${mockedProps._id}`;
    const linkEl = component.find('Link');
    expect(linkEl.exists()).toBeTruthy();
    expect(linkEl.prop('to')).toEqual(expectedLink);
    expect(linkEl.prop('onClick')).toBe(mockedProps.closeAction)
  });

  it('renders proper image', () => {
    const imageEl = component.find('.image');
    expect(imageEl.exists()).toBeTruthy();
    expect(imageEl.props()).toEqual({
      className: 'image',
      src: mockedProps.smallImg,
      alt: mockedProps.title,
    });
  });

  it('renders title with proper text', () => {
    const titleEl = component.find('.title');
    expect(titleEl.exists()).toBeTruthy();
    expect(titleEl.text()).toBe(mockedProps.title);
  });

  it('renders info about availability', () => {
    const availableInfoEL = component.find('.played');
    expect(availableInfoEL.text()).toBe('now');

    const propsWithPlayedSoon = {
      ...mockedProps,
      played: 'soon',
    };

    const componentWithPlayedSoon = shallow(<SmallMovieItem {...propsWithPlayedSoon} />);
    expect(componentWithPlayedSoon.find('.played').text()).toBe('soon');
  });
});