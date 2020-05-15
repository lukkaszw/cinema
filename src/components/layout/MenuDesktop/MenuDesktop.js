import React from 'react';
import { NavLink } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from './MenuDesktop.module.scss';
import ButtonLink from '../../common/ButtonLink/ButtonLink';
import IconButton from '../../common/IconButton/IconButton';


const MenuDesktop = ({ links, openSearchPanel }) => {
  return ( 
    <ul
      className={styles.root}
    >
      {
        links.map((link) => (
          <li
            className={styles.item}
            key={link.title}
          >
            <NavLink
              className={styles.link}
              to={link.to}
              exact={link.to === '/'}
              activeClassName={styles.active}
            >
              {link.title}
            </NavLink>
          </li>
        ))
      }
      <li
        className={styles.item}
      >
        <IconButton 
          icon={faSearch}
          action={openSearchPanel}
        />
      </li>
      <li
        className={styles.item}
      >
        <ButtonLink 
          to="/login"
          title="Sign in"
          size="small"
        />
      </li>
    </ul>
   );
}

MenuDesktop.propTypes = {
  links: PropTypes.array.isRequired,
  openSearchPanel: PropTypes.func.isRequired,
};
 
export default MenuDesktop;