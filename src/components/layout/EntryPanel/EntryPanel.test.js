import React from 'react';
import { shallow } from 'enzyme';
import EntryPanel from './EntryPanel';

const mockedProps = {
  img: '/image.jpg',
  title: 'Title',
  from: '12 April',
  to: '30 April',
  types: ['2d', '3d'],
};

const component = shallow(<EntryPanel {...mockedProps}/>);

describe('EntryPanel component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes ButtonLink to book a ticket', () => {
    expect(component.find('ButtonLink').exists()).toBeTruthy();
    expect(component.find('.link').exists()).toBeTruthy();
  });

  it('includes a photo', () => {
    const photoEl = component.find('.photo');
    expect(photoEl.exists()).toBeTruthy();
    expect(photoEl.prop('src')).toEqual(mockedProps.img);
  });

  it('includes panel with dates and types', () => {
    const panelEl = component.find('.panel');
    const datesPanelEl = component.find('.dates');
    const typesEl = component.find('.types');
    expect(panelEl.exists()).toBeTruthy();
    expect(typesEl.exists()).toBeTruthy();
    expect(datesPanelEl.exists()).toBeTruthy();
    expect(datesPanelEl.text()).toEqual(`${mockedProps.from} - ${mockedProps.to}`);
    expect(typesEl.text()).toEqual(`${mockedProps.types[0]} | ${mockedProps.types[1]}`)
  });
});