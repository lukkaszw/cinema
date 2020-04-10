import React from 'react';
import { NavLink } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';
import IconButton from '../../common/IconButton/IconButton';
import ButtonLink from '../../common/ButtonLink/ButtonLink';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './PullOutMenu.module.scss';

const PullOutMenu = ({ isActive, links, closeAction }) => {
  return ( 
    <div className={clsx([ styles.root, isActive && styles.active ])}>
      <div className={styles.logo}>
        <Logo 
          size='small'
        />
      </div>
      <ul className={styles.list}>
        <li 
          className={styles.item}
        >
          <ButtonLink 
            title='Sign in'
            size='small'
            to='/login'
            secondaryAction={closeAction}
          />
        </li>
        { links.map(link => (
          <li 
            className={styles.item}
            key={link.title}
          >
            <NavLink
              className={styles.link}
              to={link.to}
              exact
              activeClassName={styles.active}
              onClick={closeAction}
            >
              {link.title}
            </NavLink>
          </li>
        ))}
        <li 
          className={styles.item}
        >
          <IconButton 
            icon={faSearch} 
            action={() => {
              closeAction();
            }}
          />
        </li>
      </ul>
      <div className={styles.leftCourtain} />
      <div className={styles.rightCourtain} />
    </div>
   );
}

PullOutMenu.propTypes = {
  isActive: PropTypes.bool.isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

PullOutMenu.defaultProps = {
  isActive: false,
  links: [],
};
 
export default PullOutMenu;