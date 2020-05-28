import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonLink from '../../../common/ButtonLink/ButtonLink';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './OneUserNews.module.scss';
import clsx from 'clsx';

const OneUserNews = ({ _id, isActive, isRead, onToggleActivity, title, text, updatedAt, link, linkText }) => {
  const dateString = new Date(updatedAt).toLocaleDateString();

  return ( 
    <li 
      className={clsx([styles.root, isActive && styles.active, isRead && styles.isRead])}
    >
      <Link 
        onClick={onToggleActivity}
        to={`#news_nr_${_id}`}
        className={styles.header}
      >
        <span className={styles.readIcon}>
          {
            isRead ? null : <FontAwesomeIcon icon={faBookReader} />
          }
        </span>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.date}>
          {
            dateString
          }
        </span>
      </Link>
      <div className={styles.content}>
        <p className={styles.message}>{text}</p>
        {
          (link && linkText) &&
            <div className={styles.btnLink}>
              <ButtonLink 
                title={linkText}
                to={link}
                size="small"
              />
            </div>

        }
      </div>
    </li>
   );
}

OneUserNews.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isRead: PropTypes.bool.isRequired,
  onToggleActivity: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  link: PropTypes.string,
  linkText: PropTypes.string,
}
 
export default OneUserNews;