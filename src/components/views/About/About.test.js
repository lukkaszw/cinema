import React from 'react';
import { shallow } from 'enzyme';
import About from './About';

const component = shallow(<About />);

describe('About Component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes PageHeader component', () => {
    const expectedImg = '/images/cinema/entry.jpg';
    const pageHeaderEl = component.find('PageHeader');
    expect(pageHeaderEl.exists()).toBeTruthy();
    expect(pageHeaderEl.props()).toEqual({
      img: expectedImg,
    });
  });
});