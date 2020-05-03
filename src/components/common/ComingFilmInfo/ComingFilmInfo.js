import React from 'react';
import PropTypes from 'prop-types';
import styles from './ComingFilmInfo.module.scss';

const ComingFilmInfo = ({ playDate }) => {
  return ( 
    <div className={styles.root}>
      <h3 className={styles.info}>
        {
          playDate ?
            `Available from ${playDate}!`
            :
            'Coming soon!'
        }
      </h3>
    </div>
   );
}

ComingFilmInfo.propTypes = {
  playDate: PropTypes.string,
};
 
export default ComingFilmInfo;