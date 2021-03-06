import React from 'react';
import { shallow } from 'enzyme';
import Page from './Page';

const ChildComponent = () => (<div></div>);

const componentWithData = shallow(
  <Page
    isFetching={false}
    isFetchingError={false}
  >
    <ChildComponent />
  </Page>
);

const componentWhenFetching = shallow(
  <Page
    isFetching={true}
    isFetchingError={false}
  >
    <ChildComponent />
  </Page>
);
const componentWithError = shallow(
  <Page
    isFetching={false}
    isFetchingError={true}
  >

  </Page>
);

describe('Page component', () => {
  it('renders without crashing', () => {
    expect(componentWithData).toBeTruthy();
    expect(componentWithError).toBeTruthy();
    expect(componentWhenFetching).toBeTruthy();
  });

  it('renders LoaderIndicator with proper prop isLoading', () => {
    expect(componentWithData.find('LoaderIndicator').prop('isActive')).toBe(false);
    expect(componentWithError.find('LoaderIndicator').prop('isActive')).toBe(false);
    expect(componentWhenFetching.find('LoaderIndicator').prop('isActive')).toBe(true);
  });

  it('shows children only when fetching is finished without error', () => {
    expect(componentWithData.find('ChildComponent').exists()).toBeTruthy();
    expect(componentWithError.find('ChildComponent').exists()).toBeFalsy();
    expect(componentWhenFetching.find('ChildComponent').exists()).toBeFalsy();
  });
});