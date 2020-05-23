import React from 'react';
import PropTypes from 'prop-types';

const UserNews = ({ news, onSetRead }) => {
  return ( 
    <div>User news</div>
   );
}

UserNews.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object),
}
 
export default UserNews;