import React from 'react';
import PropTypes from 'prop-types';
import PageEntryImg from '../PageEntryImg/PageEntryImg';
import styles from './PageHeader.module.scss';

const PageHeader = ({ img, imgPortrait, title }) => {
  return ( 
    <header
      className={styles.root}
    >
      <PageEntryImg 
        img={img}
        title={title}
        imagePortrait={imgPortrait}
      />
    </header>
   );
}

PageHeader.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  imgPortrait: PropTypes.string,
}
 
export default PageHeader;