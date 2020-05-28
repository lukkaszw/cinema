import React from 'react';
import { shallow } from 'enzyme';
import UserNews from './UserNews';

const mockedNews = [
  {
    _id: '1',
    title: 'Title 1',
    text: 'Text 1',
    isRead: false,
    updatedAt: '22.06.2020',
  },
  {
    _id: '2',
    title: 'Title 2',
    text: 'Text 2',
    isRead: true,
    updatedAt: '21.06.2020',
    link: '/link',
    linkText: 'Go to link',
  },
];

const mockedPropsWithNews = {
  token: 'sometoken',
  news: mockedNews,
  setNewsAsRead: jest.fn(),
};

const mockedPropsWithoutNews = {
  token: 'sometoken',
  news: [],
  setNewsAsRead: jest.fn(),
}

const componentWithNews = shallow(<UserNews {...mockedPropsWithNews} />);
const componentWithoutNews = shallow(<UserNews {...mockedPropsWithoutNews} />);

describe('UserSettings component', () => {
  describe('rendering', () => {
    it('renders withotu crashing', () => {
      expect(componentWithNews).toBeTruthy();
      expect(componentWithoutNews).toBeTruthy();
    });
  
    it('renders message "No news for you!" and no OneUserNews  when news are not provided', () => {
      const message = componentWithoutNews.find('.message');
      expect(message.exists()).toBeTruthy();
      expect(message.text()).toBe('No news for you!');

      const oneUserNewsEl = componentWithoutNews.find('OneUserNews');
      expect(oneUserNewsEl.exists()).toBeFalsy();
    });

    it(`renders no message and ${mockedNews.length} OneUserNews elements when news are provided`, () => {
      const message = componentWithNews.find('.message');
      expect(message.exists()).toBeFalsy();

      const oneUserNewsEl = componentWithNews.find('OneUserNews');
      expect(oneUserNewsEl.length).toBe(mockedNews.length);
    });

    it('renders OneUserNews with proper props', () => {
      const oneUserNewsEl = componentWithNews.find('OneUserNews');
      oneUserNewsEl.forEach((oneNewsEl, i) => {
        expect(oneNewsEl.prop('_id')).toBe(mockedNews[i]._id);
        expect(oneNewsEl.prop('title')).toBe(mockedNews[i].title);
        expect(oneNewsEl.prop('text')).toBe(mockedNews[i].text);
        expect(oneNewsEl.prop('isRead')).toBe(mockedNews[i].isRead);
        expect(oneNewsEl.prop('updatedAt')).toBe(mockedNews[i].updatedAt);
        expect(oneNewsEl.prop('isActive')).toBe(false);
        expect(oneNewsEl.prop('link')).toBe(mockedNews[i].link);
        expect(oneNewsEl.prop('linkText')).toBe(mockedNews[i].linkText);
      });
    });
  });

  describe('functionality', () => {
    it('has no active news in the begining', () => {
      const instance = componentWithNews.instance();
      expect(instance.state.activeNews).toBe(null);
    });

    it('activate news as read and fires setNewsAsRead function when news is read for the firts time', () => {
      const instance = componentWithNews.instance();
      expect(instance.state.activeNews).toBe(null);

      const userNewsNotReadBefore = componentWithNews.find('OneUserNews').at(0);
      const userNewsReadBefore = componentWithNews.find('OneUserNews').at(1);
      
      //check state of the setNewsAsRead function at the begining
      expect(mockedPropsWithNews.setNewsAsRead).toHaveBeenCalledTimes(0);

      //click on usernews not read before
      userNewsNotReadBefore.prop('onToggleActivity')();
      expect(instance.state.activeNews).toBe(mockedNews[0]._id);
      expect(componentWithNews.find('OneUserNews').at(0).prop('isActive')).toBe(true);
      expect(componentWithNews.find('OneUserNews').at(1).prop('isActive')).toBe(false);
      expect(mockedPropsWithNews.setNewsAsRead).toHaveBeenCalledTimes(1);
      expect(mockedPropsWithNews.setNewsAsRead).toHaveBeenCalledWith(mockedPropsWithNews.token, mockedNews[0]._id);

      //click on usernews read before
      userNewsReadBefore.prop('onToggleActivity')();
      expect(instance.state.activeNews).toBe(mockedNews[1]._id);
      expect(componentWithNews.find('OneUserNews').at(0).prop('isActive')).toBe(false);
      expect(componentWithNews.find('OneUserNews').at(1).prop('isActive')).toBe(true);
      expect(mockedPropsWithNews.setNewsAsRead).toHaveBeenCalledTimes(1);

      //click again on usernews read before
      userNewsReadBefore.prop('onToggleActivity')();
      expect(instance.state.activeNews).toBe(null);
      expect(componentWithNews.find('OneUserNews').at(0).prop('isActive')).toBe(false);
      expect(componentWithNews.find('OneUserNews').at(1).prop('isActive')).toBe(false);
    });
  });
});