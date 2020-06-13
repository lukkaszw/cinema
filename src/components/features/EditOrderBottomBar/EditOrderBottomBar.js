import React, { useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import styles from './EditOrderBottomBar.module.scss';
import { getDate } from '../../../utils/getDate/getDate';

const EditOrderBottomBar = ({ orderToEdit }) => {
  const [isCanceling, setIsCanceling] = useState(false);
  const date = useMemo(() => getDate(orderToEdit.showId.day), [orderToEdit]);
  const startCanceling = useCallback(() => setIsCanceling(true), [setIsCanceling]);
  const stopCanceling = useCallback(() => setIsCanceling(false), [setIsCanceling]);
  const history = useHistory();
  const goBack = useCallback(() => history.push('/user/orders'), [history]);

  return ( 
    <div className={styles.root}>
      {
        !isCanceling ?
          <>
            <p>You are editing your order:</p>
            <p className={styles.text}>
              <span className={styles.item}>{date}</span>
              <span className={styles.item}>{orderToEdit.showId.startAt}</span>
              <span className={styles.item}>{orderToEdit.showId.movieId.title}</span>
            </p>
            <Button
              variants={['tiny']}
              action={startCanceling}
            >
              Cancel
            </Button>
          </>
          :
          <>
            <p className={styles.text}>Are you sure you want to cancel editing?</p>
            <div className={styles.btns}>
              <span className={styles.btn}>
                <Button
                  variants={['tiny', 'secondary']}
                  action={stopCanceling}
                >
                  No
                </Button>
              </span>
              <span className={styles.btns}>
                <Button
                  variants={['tiny']}
                  action={goBack}
                >
                  Yes
                </Button> 
              </span>
            </div>
          </>
      }
  
    </div>
   );
}

EditOrderBottomBar.propTypes = {
  orderToEdit: PropTypes.object.isRequired,
};
 
export default EditOrderBottomBar;