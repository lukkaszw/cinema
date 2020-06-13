import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './OrderItem.module.scss';
import clsx from 'clsx';
import Button from '../../common/Button/Button';
import { getDate } from '../../../utils/getDate/getDate';

const OrderItem = ({ _id, showId, seats, email, phone, name, price, surname, isActive, onToggleActive, onEdit, onDelete }) => {

  const title = showId.movieId.title;
  const date = useMemo(() => getDate(showId.day), [showId]);
  const seatsString = useMemo(() => seats.join(', '), [seats])

  return ( 
    <li className={clsx([styles.root, isActive && styles.active])}>
      <a 
        href={`#order_nr-${_id}`}
        className={styles.header}
        onClick={onToggleActive}
      >
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.dates}>
          <span className={styles.date}>{date}</span>
          <span>{showId.startAt}</span>
        </div>
      </a>
      <div className={styles.content}>
        <p className={styles.data}>
          <span className={styles.category}>hall:</span> 
          <span className={styles.important}>{showId.hall}</span> 
        </p>
        <p className={styles.data}>
          <span className={styles.category}>tickets:</span> 
          <span className={styles.important}>{seats.length}</span> 
        </p>
        <p className={styles.tickets}>
          <span className={styles.category}>seats: </span>
          <span>{seatsString}</span>
        </p>
        <p className={styles.data}>
          <span className={styles.category}>user: </span>
          <span className={styles.important}>{name} {surname}</span>
        </p>
        <p className={styles.data}>
          <span className={styles.category}>email: </span>
          <span>{email}</span>
        </p>
        <p className={styles.data}>
          <span className={styles.category}>phone: </span>
          <span>{phone}</span>
        </p>
        <p className={styles.data}>
          <span className={styles.category}>price:</span> 
          <span className={styles.important}>{price}$</span>
        </p>
        <div className={styles.btns}>
          <span className={styles.btn}>
            <Button
              variants={['small', 'secondary']}
              action={onEdit}
            >
              Edit
            </Button>
          </span>
          <span className={styles.btn}>
            <Button
              variants={['small']}
              action={onDelete}
            >
              Delete
            </Button>
          </span>
        </div>
      </div>
    </li>
   );
}

OrderItem.propTypes = {
  _id: PropTypes.string.isRequired,
  showId: PropTypes.object.isRequired,
  seats: PropTypes.arrayOf(PropTypes.string).isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
};
 
export default OrderItem;