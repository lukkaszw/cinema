import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageEntryImg.module.scss';

const PageEntryImg = ({ img, title, imagePortrait }) => {
  return ( 
    <div className={styles.root}>
      <picture>
        {
          imagePortrait &&
          <source media="(max-width: 500px) and (orientation: portrait)" srcSet={imagePortrait} />
        }
        <img className={styles.photo} src={img} alt="page-header" />
      </picture>
      <h1 className={styles.title}>{title}</h1>
    </div>
   );
}

PageEntryImg.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  imagePortrait: PropTypes.string,
};
 
export default PageEntryImg;