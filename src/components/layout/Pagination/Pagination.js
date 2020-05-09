import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, itemsPerPage, allItems, paginate }) => {
  useEffect(() => {
    window.location.hash = currentPage;
  }, [currentPage]);

  const pageNrs = [];

  for(let i = 1; i <= Math.ceil(allItems/itemsPerPage); i++) {
    pageNrs.push(i);
  }



  return ( 
    <ul className={styles.root}>
      {
        pageNrs.map(nr => (
          <li 
            className={styles.item}
            key={nr}
          >
            <a 
              onClick={() => paginate(nr)}
              className={clsx([styles.pageNr, nr === currentPage && styles.active])}
              href={`#${nr}`}
            >
              {nr}
            </a> 
          </li>
        ))
      }
    </ul>
   );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  allItems: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};
 
export default Pagination;