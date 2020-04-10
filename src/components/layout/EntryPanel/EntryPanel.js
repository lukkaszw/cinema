import React from 'react';
import ButtonLink from '../../common/ButtonLink/ButtonLink';
import PropTypes from 'prop-types';
import styles from './EntryPanel.module.scss';

const EntryPanel = ({ img, title, from, to, types }) => {
  return ( 
    <article 
      className={styles.root}
    >
      <img 
        src={img}
        className={styles.photo}
        alt={title}
      />
      <div className={styles.link}>
        <ButtonLink 
          size="big"
          title="Book Now"
          to="/movies"
        />
        <div className={styles.panel}>
          <div className={styles.dates}>
            {from} - {to}
          </div>
          <div className={styles.types}>
            {types.join(' | ')}
          </div>
        </div>
      </div>
    </article>
   );
}

EntryPanel.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
};
 
export default EntryPanel;