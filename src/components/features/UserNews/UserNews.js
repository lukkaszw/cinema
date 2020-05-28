import React, { Component } from 'react';
import OneUserNews from './OneUserNews/OneUserNews';
import PropTypes from 'prop-types';
import styles from './UserNews.module.scss';

class UserNews extends Component {
  state={
    activeNews: null,
  }

  handleToggleActivateNews = (newsId, isRead) => {
    if(!isRead) {
      this.handleSetNewsAsRead(newsId);
    }
    this.setState(prevState => {
      const isActive = prevState.activeNews === newsId;
      if(isActive) {
        window.location.hash = '';
      }
      
      return ({
        activeNews: isActive ? null : newsId,
      })
    });
  }

  handleSetNewsAsRead = (newsId) => {
    const token = this.props.token;
    this.props.setNewsAsRead(token, newsId);
  }


  render () {
    const { news } = this.props;
    const { activeNews } = this.state;
    const { handleToggleActivateNews } = this;

    return ( 
      <ul className={styles.root}>
        {
          (!news || news.length === 0) ?
            <h3 className={styles.message}>
              No news for you!
            </h3>
            :
            news.map(nws => (
              <OneUserNews 
                key={nws._id}
                onToggleActivity={() => handleToggleActivateNews(nws._id, nws.isRead)}
                isActive={activeNews === nws._id}
                {...nws}
              />
            ))
        }
      </ul>
    );
  }
}

UserNews.propTypes = {
  token: PropTypes.string,
  news: PropTypes.arrayOf(PropTypes.object),
  setNewsAsRead: PropTypes.func.isRequired,
}
 
export default UserNews;