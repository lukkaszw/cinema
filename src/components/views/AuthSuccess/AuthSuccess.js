import React from 'react';
import ButtonLink from '../../common/ButtonLink/ButtonLink';
import Page from '../../layout/Page/Page';
import styles from './AuthSuccess.module.scss';

const AuthSuccess = () => {
  return ( 
    <Page noHeader>
      <div className={styles.root}>
        <h1 className={styles.message}>You're successfully logged in to your account!</h1>
        <ButtonLink 
          to="/"
          title="Return to home page!"
        />
      </div>
    </Page>
   );
}
 
export default AuthSuccess;