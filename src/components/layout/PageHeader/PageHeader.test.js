import React from 'react';
import { shallow } from 'enzyme';
import PageHeader from './PageHeader';

const mockedProps = {
  title: 'Test title',
  img: '/image.jpg',
};

const component = shallow(<PageHeader {...mockedProps}/>);

describe('PageHeader component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes PageEntryImg element with proper props', () => {
    const pageEntryImgEl = component.find('PageEntryImg');
    expect(pageEntryImgEl.exists()).toBeTruthy();
    expect(pageEntryImgEl.props()).toEqual(mockedProps);
  });
});