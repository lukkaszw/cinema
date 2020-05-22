import React from 'react';
import { NavLink } from 'react-router-dom';
import { faSearch, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from './MenuDesktop.module.scss';
import ButtonLink from '../../common/ButtonLink/ButtonLink';
import IconButton from '../../common/IconButton/IconButton';
import IconLink from '../../common/IconLink/IconLink';


const MenuDesktop = ({ isAuth, links, openSearchPanel }) => {
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
      {
        isAuth &&
          <li
            className={styles.item}
          >
            <IconLink to="/user" icon={faUser} specialClass="user"/>
          </li>
      }
      <li
        className={styles.item}
      >
        {
          !isAuth ? 
            <ButtonLink 
              to="/auth"
              title="Sign in"
              size="small"
            />
            :
            <IconLink to="/logout" icon={faPowerOff} specialClass="logout"/>
        }

      </li>
    </ul>
   );
}

MenuDesktop.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  links: PropTypes.array.isRequired,
  openSearchPanel: PropTypes.func.isRequired,
};
 
export default MenuDesktop;