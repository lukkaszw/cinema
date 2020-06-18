import React, { useState, useCallback } from 'react';
import TicketsSummary from './TicketsSummary/TicketsSummary';
import { faTicketAlt, faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TicketsList from './TicketsList/TicketsList';
import Button from '../../common/Button/Button';
import PropTypes from 'prop-types';
import styles from './TicketsPanel.module.scss';
import clsx from 'clsx';

const TicketsPanel = ({ tickets, price, handleCancelTicket }) => {
  const [isVisible, toggleVisibility] = useState(false);

  const onToggleAction = useCallback(() => toggleVisibility(prevVisible => !prevVisible), [toggleVisibility]);

  return ( 
    <div className={clsx([styles.root, isVisible && styles.visible])}>
      <TicketsList 
        tickets={tickets}
        price={price}
        handleCancelTicket={handleCancelTicket}
      />
      <TicketsSummary 
        tickets={tickets}
        price={price}
      />
      <div className={styles.btn}>
        <Button
          variants={['small', 'special']}
          action={onToggleAction}
        >
          <span className={styles.ticketsAmount}>{tickets.length}</span> <FontAwesomeIcon icon={faTicketAlt} />
          <span className={styles.btnArrow}>
            <FontAwesomeIcon icon={isVisible ? faLongArrowAltLeft : faLongArrowAltRight} />
          </span>
        </Button>
      </div>
    </div>
   );
}

TicketsPanel.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.string),
  handleCancelTicket: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
}

TicketsPanel.defaultProps = {
  tickets: [],
};
 
export default TicketsPanel;