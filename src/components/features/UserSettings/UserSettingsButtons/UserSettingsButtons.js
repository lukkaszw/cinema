import React from 'react';
import Button from '../../../common/Button/Button';
import ButtonLink from '../../../common/ButtonLink/ButtonLink';
import PropTypes from 'prop-types';
import styles from './UserSettingsButtons.module.scss';

const UserSettingsButtons = ({ handleStartEditMode }) => {
  return ( 
    <div className={styles.root}>
      <div className={styles.editBtn}>
        <Button
          action={handleStartEditMode}
          variants={['small', 'secondary']}
        >
          Edit
        </Button>
      </div>
      <div className={styles.btns}>
        <div className={styles.btn}>
          <ButtonLink
            to="/user/settings/up"
            size="small"
            variant="fourth"
            title="Update password!"
          />
        </div>
        <div className={styles.btn}>
          <ButtonLink
            to="/user/settings/delete"
            size="small"
            title="Delete account"
          />
        </div>
      </div>
    </div>
   );
}

UserSettingsButtons.propTypes = {
  handleStartEditMode: PropTypes.func.isRequired,
};
 
export default UserSettingsButtons ;