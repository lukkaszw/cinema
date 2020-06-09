import React from 'react';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';
import Logo from '../../layout/Logo/Logo';
import IconLink from '../../common/IconLink/IconLink';
import PropTypes from 'prop-types';
import styles from './Footer.module.scss';
import clsx from 'clsx';

import { socialMedias, contactData } from './data';




const Footer = ({ links }) => {
  return ( 
    <footer className={styles.root}>
      <div className={styles.line}></div>
      <Container>
        <div className={styles.grid}> 
          <div className={styles.column}>
            <Logo size="medium"/>
          </div>
          <div className={styles.column}>
            <ul className={styles.list}>
              {links.map(link => (
                <li 
                  key={link.title}
                  className={styles.item}
                >
                  <Link 
                    className={styles.link}
                    to={link.to}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <ul className={clsx([styles.list, styles.list__right])}>
              {
                socialMedias.map(link => (
                  <li
                    key={link.title}
                    className={clsx([styles.item, styles.item__social])}
                  >
                    <IconLink 
                      to={link.to}
                      icon={link.icon}
                      outside={true}
                      circle={true}
                      specialClass={link.title}
                    />
                  </li>
                ))
              }
            </ul> 
          </div>
        </div>
        <div className={styles.contact}>
          {
            contactData.map((data, index) => {
              const textEl = data.type === 'phone' ? (
                <span>tel. 
                  <a 
                    href={`tel:${data.text.split(' ').join('')}`}
                    className={styles.phone}
                  >
                    {data.text}
                  </a>
                </span>
              )
              :
              <span>{data.text}</span>;
              return (
                <p 
                  key={index}
                  className={styles.description}
                >
                  {textEl}
                </p>
              )
            })
          }
        </div>
        <p className={styles.rights}>
          &copy; Łukasz Wojdat 2020
        </p>
      </Container>
    </footer>
   );
}
 
Footer.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Footer;