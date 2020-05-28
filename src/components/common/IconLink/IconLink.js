import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './IconLink.module.scss';

const IconLink = ({ to, outside, icon, circle, specialClass, mobile, secondaryAction }) => {
  const classes = [
    styles.root, 
    circle && styles.circle, 
    specialClass && styles[specialClass],
    mobile && styles.mobile
  ];

  return (
    <>
      {
        outside ? 
          <a 
            onClick={secondaryAction}
            className={clsx(classes)}
            href={to}
            target="__blank"
          >
            <FontAwesomeIcon icon={icon} />
          </a>
          :
          <Link
            onClick={secondaryAction}
            className={clsx(classes)}
            to={to}
          >
            <FontAwesomeIcon icon={icon} />
          </Link>
      }
    </> 

   );
}

IconLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  outside: PropTypes.bool,
  circle: PropTypes.bool,
  specialClass: PropTypes.string,
  secondaryAction: PropTypes.func,
};
 
export default IconLink;