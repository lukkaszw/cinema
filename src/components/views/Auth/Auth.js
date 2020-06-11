import React, { useState, useCallback, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import Page from '../../layout/Page/Page';
import SignIn from '../../features/SignUser/SignUser.signIn.container';
import SignUp from '../../features/SignUser/SignUser.signUp.container';
import PropTypes from 'prop-types';
import styles from './Auth.module.scss';

export const Auth = ({ isAuthenticated, resetFormState }) => {
  const [panelNr, setPanelNr] = useState(0);
  const  goToLoginPanel = useCallback(() => setPanelNr(0),[setPanelNr]);
  const goToRegisterPanel = useCallback(() => setPanelNr(1), [setPanelNr]);
  useEffect(() => () => resetFormState(), [resetFormState]);

  const location = useLocation();

  return ( 
    <Page noHeader>
      <div className={styles.root}>
        <div 
          style={{ transform: `translateX(-${50 * panelNr}%)`}}
          className={styles.formsPanel}
        >
          <div className={styles.form}>
            <SignIn 
              goToOtherPanel={goToRegisterPanel}
            />
          </div>
          <div className={styles.form}>
            <SignUp 
              isForRegister
              goToOtherPanel={goToLoginPanel}
            />
          </div>
        </div>
      </div>
      {
        isAuthenticated && (
          location.state ?
            <Redirect to={`/order/${location.state.from}`} />
            :
            <Redirect to='/auth/success' />
        )
      }
    </Page>
  );
}

Auth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  resetFormState: PropTypes.func.isRequired,
};
 
export default Auth;