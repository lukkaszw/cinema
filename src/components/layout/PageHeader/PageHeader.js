import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageHeader.module.scss';

const PageHedaer = ({ img, imgPortrait, title }) => {
  return ( 
    <header
      className={styles.root}
    >
      <picture>
        {
          imgPortrait &&
          <source media="(max-width: 500px) and (orientation: portrait)" srcSet={imgPortrait} />
        }
        <img className={styles.photo} src={img} alt="page-header" />
      </picture>
      <h1 className={styles.title}>{title}</h1>
    </header>
   );
}

PageHedaer.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  imgPortrait: PropTypes.string,
}
 
export default PageHedaer;