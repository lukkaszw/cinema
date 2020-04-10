import React from 'react';
import { shallow } from 'enzyme';
import Container from './Container';

const MockedComponent = () => <div></div>;

const component = shallow(
  <Container>
    <MockedComponent />
  </Container>
);

describe('Container component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes MockedComponent', () => {
    expect(component.find('MockedComponent').exists()).toBeTruthy();
  });
});