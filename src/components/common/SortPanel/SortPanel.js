import React, { useCallback } from 'react';
import IconButton from '../IconButton/IconButton';
import { faSortAlphaDown, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from './SortPanel.module.scss';

const SortPanel = ({ sort, setSort}) => {
  const sortAsc =  useCallback(() => setSort('asc'), [setSort]);
  const sortDesc = useCallback(() => setSort('desc'), [setSort]);

  return ( 
    <div className={styles.root}>
      <IconButton 
        icon={faSortAlphaDown}
        action={sortAsc}
        inactive={sort !== 'asc'}
        notGrow
      />
      <IconButton 
        icon={faSortAlphaUp}
        action={sortDesc}
        inactive={sort !== 'desc'}
        notGrow
      />
    </div>
   );
}

SortPanel.propTypes = {
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
};
 
export default SortPanel;