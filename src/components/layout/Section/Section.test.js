import React from 'react';
import { shallow } from 'enzyme';
import Section from './Section';

const mockedProps = {
  title: 'Test title'
};

const MockedComponent = () => (
  <div></div>
)

const component = shallow(
  <Section {...mockedProps}>
    <MockedComponent />
  </Section>
);

describe('Section component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes section element', () => {
    const sectionEl = component.find('section');
    expect(sectionEl.exists()).toBeTruthy();
  });

  it('includes h2 title element with class title and text from prop title', () => {
    const titleEl = component.find('h2.title');
    expect(titleEl.exists()).toBeTruthy();
    expect(titleEl.text()).toEqual(mockedProps.title);
  });

  it('includes DividedLine', () => {
    expect(component.find('DividedLine').exists()).toBeTruthy();
  });

  it('includes MockedComponent', () => {
    expect(component.find('MockedComponent')).toBeTruthy();
  });

});