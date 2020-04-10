import React from 'react';
import DividedLine from '../../common/DividedLine/DividedLine';
import PropTypes from 'prop-types';
import styles from './Section.module.scss';

const Section = ({ title, children }) => {
  return ( 
    <section className={styles.root}>
      {
        title &&  
        <>
          <h2 className={styles.title}>{title}</h2>
          <DividedLine />
        </>
      }
      {children}
    </section>
   );
}

Section.propTyps = {
  title: PropTypes.string,
  children: PropTypes.node,
};
 
export default Section;