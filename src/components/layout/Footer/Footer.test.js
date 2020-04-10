import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';
import { socialMedias as socialMediaExpectedLinks, contactData as expectedContactData } from './data';

const mockedProps = {
  links: [
    {
      title: 'Home',
      to: '/',
    },
    {
      title: 'Shedule',
      to: '/schedule',
    },
    {
      title: 'Movies',
      to: '/movies',
    },
  ]
};

const component = shallow(<Footer {...mockedProps}/>);

describe('Footer component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes footer element', () => {
    const footerEl = component.find('footer');
    expect(footerEl.exists()).toBeTruthy();
  });

  it('includes Container element', () => {
    expect(component.find('Container').exists()).toBeTruthy();
  });

  it('includes grid element and 3 columns elements', () => {
    expect(component.find('.grid').exists()).toBeTruthy();
    const footerColumnsEl = component.find('.column');
    expect(footerColumnsEl.length).toBe(3);
  });

  it(`includes contact element with ${expectedContactData.length} p.description elements with proper text`, () => {
    const contactEl = component.find('.contact');
    const descrEl = contactEl.find('.description');
    expect(descrEl.length).toBe(expectedContactData.length);
    expectedContactData.forEach((data, index) => {
      const text = data.type === 'phone' ? `tel.${data.text}` : data.text;
      expect(descrEl.at(index).text()).toEqual(text);
    });
  });

  it('includes phone number link with proper text', () => {
    const phoneLinkEl = component.find('a.phone');
    expect(phoneLinkEl.exists()).toBeTruthy();
    const expectedPhoneNr = expectedContactData
      .find(data => data.type === 'phone')
      .text
      .split(' ')
      .join('');
    expect(phoneLinkEl.prop('href')).toBe(`tel:${expectedPhoneNr}`);
  });

  it('includes Logo with size medium', () => {
    const logoEl = component.find('Logo');
    expect(logoEl.exists()).toBeTruthy();
    expect(logoEl.prop('size')).toBe('medium');
  });

  it(`includes 2 lists of items`, () => {
    expect(component.find('ul.list').length).toBe(2);
  });

  it(`includes list with ${mockedProps.links.length} Links with proper props`, () => {
    const firstListEl = component.find('ul.list').at(0);
    const linksEl = firstListEl.find('Link');
    expect(linksEl.length).toBe(mockedProps.links.length);
    mockedProps.links.forEach((link, index) => {
      expect(linksEl.at(index).prop('to')).toBe(link.to)
      expect(linksEl.at(index).text()).toBe(link.title);
    });
  });

  it('includes list with 3 IconLinks with proper props', () => {
    const secondListEl = component.find('ul.list').at(1);
    const iconLinksEl = secondListEl.find('IconLink');
    expect(iconLinksEl.length).toBe(3);
    socialMediaExpectedLinks.forEach((link, index) => {
      expect(iconLinksEl.at(index).prop('to')).toBe(link.to);
      expect(iconLinksEl.at(index).prop('icon')).toBe(link.icon);
      expect(iconLinksEl.at(index).prop('specialClass')).toBe(link.title);
    });
  });

  it('includes rights element with proper text', () => {
    const rightsEl = component.find('.rights');
    expect(rightsEl.exists()).toBeTruthy();
    const copyrightUnicode = '\u00A9';
    expect(rightsEl.text()).toBe(`${copyrightUnicode} Łukasz Wojdat 2020`);
  });
});