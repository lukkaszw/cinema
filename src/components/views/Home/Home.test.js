import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

const component = shallow(<Home />);

describe('Home Component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes EntryPanel', () => {
    expect(component.find('EntryPanel').exists()).toBeTruthy();
  });

  it('includes Two Section elements with title "CURRENTLY PLAYED" and "COMMING SOON"', () => {
    const sectionsEl = component.find('Section');
    expect(sectionsEl.length).toBe(2);
    expect(sectionsEl.at(0).prop('title')).toBe("CURRENTLY PLAYED");
    expect(sectionsEl.at(1).prop('title')).toBe("COMMING SOON");
  });
});