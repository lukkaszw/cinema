import React from 'react';
import Loader from '../../common/Loader/Loader';
import PropTypes from 'prop-types';
import styles from './LoaderIndicator.module.scss';

const LoaderIndicator = ({ isActive, size, color, top }) => {
  const style = {};
  if(top) {
    style.top = `${top}%`;
  }

  const comp = isActive ?
    (
      <div 
        className={styles.root}
        style={style}
      >
        <Loader 
          classes={[color, size]}
        />
      </div>
    )
    :
    null;
  
  return comp;
}

LoaderIndicator.propTypes = {
  isActive: PropTypes.bool,
  top: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.string,
};
 
LoaderIndicator.defaultProps = {
  size: 'small',
  color: 'red',
};

export default LoaderIndicator;