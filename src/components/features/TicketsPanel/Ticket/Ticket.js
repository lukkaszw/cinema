import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../../common/IconButton/IconButton';
import PropTypes from 'prop-types';
import styles from './Ticket.module.scss';

const Ticket = ({ ticketId, price, onCancel }) => {
  const parts = ticketId.split('');
  const seat = parts.filter(part => part.match(/[0-9]/)).join('')
  const row = parts[parts.length - 1];

  return ( 
    <li className={styles.root}>
      <span className={styles.column}>
        seat:<strong className={styles.value}>{seat}</strong>
      </span>
      <span className={styles.column}>
        row:<strong className={styles.value}>{row}</strong>
      </span>
      <strong className={styles.value}>{price}$</strong>
      <IconButton 
        icon={faTimes}
        action={onCancel}
      />
    </li>
   );
}

Ticket.propTypes = {
  ticketId: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
};
 
export default Ticket;