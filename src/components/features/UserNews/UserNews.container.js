import { connect } from 'react-redux';
import UserNews from './UserNews';

import SELECTORS from '../../../redux/selectors';
import API from '../../../redux/api';

const mapStateToProps = (state) => ({
  token: SELECTORS.auth.getToken(state),
  news: SELECTORS.user.getNews(state),
});

const mapDispatchToProps = (dispatch) => ({
  setNewsAsRead: (token, newsId) => dispatch(API.user.sendReadNews(token, newsId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNews);