import React from 'react';
import PageHeader from '../../../layout/PageHeader/PageHeader';
import PropTypes from 'prop-types';
import styles from './OrderHeader.module.scss';


const OrderHeader = ({ img, imgPortrait }) => {
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

OrderHeader.propTypes = {
  img: PropTypes.string.isRequired,
  imgPortrait: PropTypes.string,
};
 
export default OrderHeader;