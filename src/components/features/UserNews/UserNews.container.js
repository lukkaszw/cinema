import { connect } from 'react-redux';
import UserNews from './UserNews';

import { getToken } from '../../../redux/reducers/authRedux/authRedux';
import { sendReadNews, getNews } from '../../../redux/reducers/userRedux/userRedux';


const mapStateToProps = (state) => ({
  token: getToken(state),
  news: getNews(state),
});

const mapDispatchToProps = (dispatch) => ({
  setNewsAsRead: (token, newsId) => dispatch(sendReadNews(token, newsId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNews);