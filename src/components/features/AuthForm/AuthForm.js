import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../common/InputField/InputField';
import Form from '../../common/Form/Form';
import Button from '../../common/Button/Button';
import styles from './AuthForm.module.scss';

const AuthForm = ({
  isSending,
  isSendingError,
  isSendingSuccess,
  requestResponse,
  type, 
  login, 
  password, 
  confirmedPassword,
  onChangeLogin, 
  onChangePassword, 
  onChangeConfirmPassword,
  onSubmit, 
  title,
  btnTitle,
  query,
  queryBtn,
  queryAction,
  errors,
  resetForm,
}) => {

  const isRegister = type === 'register';
  
  return ( 
    <div
      className={styles.root}
    >
      <div>
        <h2 className={styles.title}>{title}</h2>
        <Form
          isSending={isSending}
          isError={isSendingError}
          isSuccess={isSendingSuccess}
          message={requestResponse}
          onSubmit={onSubmit}
          resetForm={resetForm}
        >
          <div className={styles.textField}>
            <InputField 
              type="email"
              placeholder="Your email address"
              value={login}
              onChange={onChangeLogin}
              autoComplete="on"
              isError={errors.login}
            />
          </div>
          <div className={styles.textField}>
            <InputField 
              type="password"
              placeholder="Your password"
              value={password}
              onChange={onChangePassword}
              autoComplete="on"
              message={isRegister ? 'Minimum 8 characters long' : null}
              isError={errors.password}
            />
          </div>
          {
            (type === 'register') &&
              <div className={styles.textField}>
                <InputField 
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmedPassword}
                  onChange={onChangeConfirmPassword}
                  autoComplete="on"
                  isError={errors.confirmPassword}
                />
              </div>
          }
          <div className={styles.signInBtn}>
            <Button
              variants={[isRegister ? 'secondary' : null]}
              disabled={isSending}
            >
              {btnTitle}
            </Button>
          </div>
        </Form>
        <div className={styles.query}>
          <p>
            {query}
          </p>
          <Button
            action={queryAction}            
            variants={['small', !isRegister ? 'secondary' : null]}
            disabled={isSending}
          >
            {queryBtn}
          </Button>
        </div>
      </div>

    </div>
   );
}

AuthForm.propTypes = {
  isSending: PropTypes.bool.isRequired,
  isSendingError: PropTypes.bool.isRequired,
  isSendingSuccess: PropTypes.bool,
  requestResponse: PropTypes.string.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onChangeLogin: PropTypes.func.isRequired,
  onChangeConfirmPassword: PropTypes.func,
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmedPassword: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  btnTitle: PropTypes.string.isRequired,
  query: PropTypes.string,
  queryBtn: PropTypes.string,
  queryAction: PropTypes.func,
  type: PropTypes.oneOf(['register', 'login']),
  errors: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired,
};

AuthForm.defaultProps = {
  type: 'login',
}
 
export default AuthForm;