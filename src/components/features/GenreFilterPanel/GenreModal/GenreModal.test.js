import React from 'react';
import { shallow } from 'enzyme';
import GenreModal from './GenreModal';
import genres from '../genres';

const mockedProps = {
  toggleAction: () => console.log('toggle action'),
  foundMoviesAmount: 10,
  values: [],
  closeModal: jest.fn()
};

const component = shallow(<GenreModal {...mockedProps} />);

describe('Genre Modal component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes checkboxes list in modal container with proper props', () => {
    const checkboxesListEl = component.find('CheckboxesList');
    expect(checkboxesListEl.exists()).toBeTruthy();
    expect(checkboxesListEl.props()).toEqual({
      items: genres,
      values: mockedProps.values,
      toggleAction: mockedProps.toggleAction,
    });
  });

  it('renders info about found movies', () => {
    const foundInfoEl = component.find('.foundInfo');
    expect(foundInfoEl.exists()).toBeTruthy();
    expect(foundInfoEl.text()).toBe(`${mockedProps.foundMoviesAmount} movies've been found!*`);
  });
});