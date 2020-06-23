import React from 'react';
import SearchedByItem from '../../../common/SearchedByItem/SearchedByItem';
import SearchedByPanel from '../../../common/SearchedByPanel/SearchedByPanel';
import PropTypes from 'prop-types';

const SearchedFilters = ({ items }) => {

  return ( 
    <SearchedByPanel>
      {
        items.map(item => (
          <SearchedByItem 
            key={item.value}
            value={item.value}
            removeAction={item.removeAction}
          />
        ))
      }
    </SearchedByPanel>
   );
}

SearchedFilters.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    removeAction: PropTypes.func.isRequired,
  })),
};

SearchedFilters.defaultProps = {
  items: [],
}

export default React.memo(SearchedFilters);