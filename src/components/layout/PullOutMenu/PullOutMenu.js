import React, { useCallback, Suspense } from 'react';
import { NavLink } from 'react-router-dom';
import { faSearch, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';
import IconButton from '../../common/IconButton/IconButton';
import ButtonLink from '../../common/ButtonLink/ButtonLink';
import IconLink from '../../common/IconLink/IconLink';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './PullOutMenu.module.scss';

const Courtains = React.lazy(() => import('./Courtains/Courtains'));

const PullOutMenu = ({ isAuth, isActive, links, closeAction, openSearchPanel }) => {
  const openPanelCloseMenu = useCallback(() => {
    openSearchPanel();
    closeAction();
  }, [openSearchPanel, closeAction])

  return (
    <div className={clsx([ styles.root, isActive && styles.active ])}>
      <div className={styles.logo}>
        <Logo 
          size='small'
        />
      </div>
      <div className={styles.links}>
        <div className={styles.iconLinks}>
        <IconButton 
          icon={faSearch} 
          action={openPanelCloseMenu}
          ariaLabel='Open search panel'
        />
        {
          isAuth &&
            <IconLink 
              to="/user" 
              icon={faUser} 
              secondaryAction={closeAction}
              specialClass="user" 
              mobile
            />
        }
        {
          !isAuth ? 
            <div className={styles.signInBtn}>
              <ButtonLink 
                title='Sign in'
                size='small'
                to='/auth'
                secondaryAction={closeAction}
              />
            </div>
            :
            <IconLink 
              to="/logout" 
              icon={faPowerOff} 
              specialClass="logout"
              mobile
            />
        }
        </div>
        <ul className={styles.list}>
          { links.map(link => (
            <li 
              className={styles.item}
              key={link.title}
            >
              <NavLink
                className={styles.link}
                to={link.to}
                exact={link.to === '/'}
                activeClassName={styles.active}
                onClick={closeAction}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <Suspense fallback='...'>
        <Courtains isActive={isActive} />
      </Suspense>
    </div>
  );
}

PullOutMenu.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  openSearchPanel: PropTypes.func.isRequired,
};

PullOutMenu.defaultProps = {
  isActive: false,
  links: [],
};
 
export default PullOutMenu;