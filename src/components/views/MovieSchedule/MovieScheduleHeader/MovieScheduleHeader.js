import React from 'react';
import PageHeader from '../../../layout/PageHeader/PageHeader';
import styles from './MovieScheduleHeader.module.scss';


const MovieScheduleHeader = ({ img, imgPortrait }) => {
  return ( 
    <header
      className={styles.root}
    >
    <PageHeader
      img={img}
      imagePortrait={imgPortrait}
    />
    </header>
   );
}
 
export default MovieScheduleHeader;