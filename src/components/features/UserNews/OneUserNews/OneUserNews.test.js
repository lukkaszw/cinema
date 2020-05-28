import React from 'react';
import { shallow } from 'enzyme';
import OneUserNews from './OneUserNews';

const mockedDateData = '2020-05-23T17:33:42.728+00:00';
const expectedDateString = '2020-5-23';

const mockedProps = {
  _id: '1',
  isActive: false,
  isRead: false,
  onToggleActivity: jest.fn(),
  title: 'Title',
  text: 'Some text',
  updatedAt: mockedDateData,
};

const mockedPropsActiveWithLinks = {
  ...mockedProps,
  isActive: true,
  isRead: true,
  link: '/link',
  linkText: 'Some link text',
}

const componentNotActive = shallow(<OneUserNews {...mockedProps} />);

const componentActiveWithLinks = shallow(<OneUserNews {...mockedPropsActiveWithLinks} />);

describe('UserSettings component', () => {
  it('renders withotu crashing', () => {
    expect(componentNotActive).toBeTruthy();
    expect(componentActiveWithLinks).toBeTruthy();
  });

  it('renders li element with proper classes', () => {
    const liNotActiveEl = componentNotActive.find('li');
    const liActiveEl = componentActiveWithLinks.find('li');

    expect(liNotActiveEl.prop('className')).toBe('root');
    expect(liActiveEl.prop('className')).toBe('root active isRead');
  });

  it('renders link with proper link and onClick action', () => {
    const linkEl = componentNotActive.find('Link');
    expect(linkEl.prop('onClick')).toBe(mockedProps.onToggleActivity);
    expect(linkEl.prop('to')).toBe(`#news_nr_${mockedProps._id}`);
  });

  it('renders title element inside Link with proper text', () => {
    const titleEl =componentNotActive.find('Link .title');
    expect(titleEl.exists()).toBeTruthy();
    expect(titleEl.text()).toBe(mockedProps.title);
  });

  it('readIcon element inside Link with icon depends if news has been read before', () => {
    const readIconELWithIcon = componentNotActive.find('Link .readIcon');
    expect(readIconELWithIcon.exists()).toBeTruthy();
    expect(readIconELWithIcon.find('FontAwesomeIcon').exists()).toBeTruthy();

    const readIconElWithoutIcon = componentActiveWithLinks.find('Link .readIcon');
    expect(readIconElWithoutIcon.exists()).toBeTruthy();
    expect(readIconElWithoutIcon.find('FontAwesomeIcon').exists()).toBeFalsy();
  });

  it('redners date element inside Link with proper text', () => {
    const dateEl = componentNotActive.find('Link .date');
    expect(dateEl.exists()).toBeTruthy();
    expect(dateEl.text()).toBe(expectedDateString);
  });

  it('renders content with proper message', () => {
    const contentMsgEl = componentNotActive.find('.content .message');
    expect(contentMsgEl.exists()).toBeTruthy();
    expect(contentMsgEl.text()).toBe(mockedProps.text);
  });

  it('renders ButtonLink inside component with props links and linkText and does not render this ButtonLink without those props', () => {
    const existingbtnLinkEl = componentActiveWithLinks.find('ButtonLink');
    expect(existingbtnLinkEl.exists()).toBeTruthy();

    const notExistingBtnLinkEl = componentNotActive.find('ButtonLink');
    expect(notExistingBtnLinkEl.exists()).toBeFalsy();
  });

  it('renders ButtonLink with proper props', () => {
    const btnLinkEl = componentActiveWithLinks.find('ButtonLink');
    expect(btnLinkEl.props()).toEqual({
      title: mockedPropsActiveWithLinks.linkText,
      to: mockedPropsActiveWithLinks.link,
      size: 'small',
    });
  });
});