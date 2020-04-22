import React from 'react';
import { shallow } from 'enzyme';
import Details from './Details';

const mockedProps = {
  title: 'Title',
  description: ['Description 1', 'Desctiption 2'],
  country: 'USA',
  language: 'English',
  direction: 'Test Director',
  releaseDate: '01.01.1970',
  duration: '100 min',
  cast: [
    {
      name: 'Actor 1',
      link: 'http://actor1.com',
    },
    {
      name: 'Actor 2',
      link: 'http://actor2.com',
    }
  ]
};

const component = shallow(<Details {...mockedProps}/>);

describe('Details component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes title with proper text', () => {
    const titleEl = component.find('h3.title');
    expect(titleEl.exists()).toBeTruthy();
    expect(titleEl.text()).toBe(mockedProps.title);
  });

  it('includes two articles', () => {
    expect(component.find('article').length).toBe(2);
  });

  it('includes table in first artice with proper data props', () => {
    const tableEl = component.find('article > Table');
    expect(tableEl.length).toBe(1);
    expect(tableEl.prop('data')).toEqual([
      { _id: '1', label: 'Country:', value: mockedProps.country },
      { _id: '2', label: 'Language:', value: mockedProps.language },
      { _id: '3', label: 'Direction:', value: mockedProps.direction },
      { _id: '4', label: 'Release date:', value: mockedProps.releaseDate },
      { _id: '5', label: 'Duration:', value: mockedProps.duration },
    ]);
  });

  it('includes second article with paragraphs about movie', () => {
    const paragraphsEl = component.find('article > p');
    expect(paragraphsEl.length).toBe(mockedProps.description.length);
    for(let i = 0; i < mockedProps.description; i++) {
      expect(paragraphsEl.at(i).text()).toBe(mockedProps.description[i]);
    }
  });

  it('includes cast element with actors and links to proper pages', () => {
    const castEl = component.find('.cast');
    expect(castEl.exists()).toBeTruthy();
    const actorsEl = castEl.find('.actor');
    expect(actorsEl.length).toBe(mockedProps.cast.length);
    actorsEl.forEach((actor, index) => {
      expect(actor.text()).toBe(mockedProps.cast[index].name);
      expect(actor.prop('href')).toBe(mockedProps.cast[index].link);
    });
  });
});