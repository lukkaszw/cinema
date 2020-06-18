import React from 'react';
import { shallow } from 'enzyme';
import LoaderIndicator from './LoaderIndicator';

const componentNotLoading = shallow(<LoaderIndicator isActive={false} />);
const componentWhenLoading = shallow(<LoaderIndicator isActive={true}/>)

describe('LoaderIndicator component', () => {
  it('renders without crashing', () => {
    expect(componentNotLoading).toBeTruthy();
    expect(componentWhenLoading).toBeTruthy();
  });

  it('renders Loader when it is loading', () => {
    const loaderEl = componentWhenLoading.find('Loader');
    expect(loaderEl.length).toBe(1);
  });

  it('does not render Loader when it is not loading', () => {
    const loaderEl = componentNotLoading.find('Loader');
    expect(loaderEl.length).toBe(0);
  });
});