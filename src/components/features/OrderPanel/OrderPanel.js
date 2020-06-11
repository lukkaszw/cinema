import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import SeatsPanel from '../SeatsPanel/SeatsPanel';
import OrderForm from '../OrderForm/OrderForm';
import OrderConfirm from '../OrderConfirm/OrderConfirm';
import Button from '../../common/Button/Button';
import OrderProcessBar from './OrderProcessBar/OrderProcessBar';
import OrderMessage from './OrderMessage/OrderMessage';
import Loader from '../../common/Loader/Loader';
import PropTypes from 'prop-types';
import styles from './OrderPanel.module.scss';
import _v from 'validator';

export class OrderPanel extends Component {
  state = { 
    orderStep: 1,
    errorId: null,
    name: '',
    surname: '',
    phone: '',
    email: '',
    valuesErrors: {
      name: false,
      surname: false,
      phone: false,
      email: false,
    },
    isFullfillFromProps: false,
  }

  componentDidUpdate() {
    if(this.props.chosenSeats.length === 0 && this.state.orderStep > 1 && !this.state.errorId) {
      this.setState({
        errorId: 2,
      });
    }
  }

  componentWillUnmount() {
    this.props.resetFormState();
  }

  static getDerivedStateFromProps(props, state) {
    if(!state.isFullfillFromProps && props.userData.email) {
      return ({
        email: props.userData.email,
        name: props.userData.name || '',
        surname: props.userData.surname || '',
        phone: props.userData.phone || '',
        isFullfillFromProps: true,
        errors: {
          email: false,
          name: false,
          surname: false,
          phone: false,
        },
      });
    }
    return null;
  }

  validate = {
    name: (value) => value.length > 1,
    surname: value => value.length > 1,
    phone: value => /^(\+48\s+)?\d{3}(\s*|-)\d{3}(\s*|-)\d{3}$/.test(value) || /^(\+48\s*)?\d{2}\s*\d{3}(\s*|-)\d{2}(\s*|-)\d{2}$/.test(value),
    email: value => _v.isEmail(value),
  }

  
  checkErrors = () => {
    const possibleErrors = this.state.valuesErrors;
    let isError = false;
    Object.keys(possibleErrors).forEach((error) => {
      if(this.state.valuesErrors[error]) {
        isError = true;
        return;
      }
    });

    if(!isError) {
      const { name, surname, phone, email } = this.state;
      if(!name || !surname || !phone || !email) {
        return true;
      }
    }
    return isError;
  }

  MESSAGES = {
    1: 'You need to select a seat to order a ticket!',
    2: 'You have no chosen seats. Please back and select some seats!',
    3: 'Please provide correct data into form!',
    4: 'Error! Your order has not been sent correctly. Please try again later!',
    5: 'Your order has been added correctly. Please check your email for backup information!',
  }

  handleModalAction = (errorId) => {
    switch (errorId) {
      case 2: 
        this.setState({
          orderStep: 1,
          errorId: null,
        });
        break;
      default: 
        this.setState({
          errorId: null,
        });
    }
  } 

  handleChangeInputValue = (e, fieldName) => {
    const value = e.target.value;
    this.setState(prevState => ({
      [fieldName]: value,
      valuesErrors: {
        ...prevState.valuesErrors,
        [fieldName]: !this.validate[fieldName](value),
      }
    }));
  }

  handleSubmitOrder = () => {
    const { name, surname, phone, email } = this.state;
    const showId = this.props.showId;
    const seats = this.props.chosenSeats;
    const token = this.props.token;

    const orderData = {
      name,
      surname,
      phone,
      email,
      showId,
      seats,
    }

    this.props.orderTickets(orderData, token);
  }

  backToMainPage = () => {
    this.props.history.push('/');
  }

  checkOrderErrors = () => {
    switch (this.state.orderStep) {
      case 1: {
        if(this.props.chosenSeats.length === 0) {
          return 1; 
        }
        break;
      }
      case 2: {
        if(this.checkErrors()) {
          return 3;
        }
        break;
      }
      default: 
        return false;
    }
  }

  goToNextStep = () => {
    const errorId = this.checkOrderErrors();
    if(errorId) {
      this.setState({
        errorId,
      });
      return;
    }

    this.setState(prevState => ({
      orderStep: prevState.orderStep < 3 ? prevState.orderStep + 1 : prevState.orderStep,
    }))
  }

  goToPrevStep = () => {
    this.setState(prevState => ({
      orderStep: prevState.orderStep > 1 ? prevState.orderStep - 1 : prevState.orderStep,
    }))
  }

  render() { 
    const { orderStep, errorId, name, surname, phone, email, valuesErrors } = this.state;
    const { 
      goToNextStep, 
      goToPrevStep, 
      handleModalAction, 
      MESSAGES, 
      handleChangeInputValue, 
      handleSubmitOrder,
      backToMainPage } = this;
    const { 
      handleToggleSeat, 
      handleCancelTicket, 
      seats, 
      chosenSeats, 
      price,
      isSendingOrder,
      isOrderSuccess,
      isOrderError,
      resetFormState,
    } = this.props;

    return ( 
      <div className={styles.root}>
        <OrderProcessBar 
          orderStep={orderStep}
        />
        <div 
          className={styles.panel}
          style={{
            transform: `translateX(-${((orderStep - 1) / 3) * 100}%)`
          }}
        >
          <div className={styles.board}>
            <SeatsPanel 
              seats={seats}
              handleToggleSeat={handleToggleSeat}
            />
          </div>
          <div className={styles.board}>
            <OrderForm 
              handleChangeInputValue={handleChangeInputValue}
              name={name}
              surname={surname}
              phone={phone}
              email={email}
              errors={valuesErrors}
            />
          </div>
          <div className={styles.board}>
            <OrderConfirm 
              name={name}
              surname={surname}
              phone={phone}
              email={email}
              chosenSeats={chosenSeats}
              handleCancelTicket={handleCancelTicket}
              price={price}
              onSubmitOrder={handleSubmitOrder}
              isSendingOrder={isSendingOrder}
            />
          </div>
        </div>
        <div className={styles.btns}>
          <Button 
            variants={['small']}
            action={goToPrevStep}
            disabled={orderStep === 1 || isSendingOrder}
          >
            Back
          </Button>
          <Button
            variants={['small']}
            action={goToNextStep}
            disabled={orderStep === 3 || isSendingOrder}
          >
            Next
          </Button>
        </div>
        {
          errorId && 
            <OrderMessage 
              message={this.MESSAGES[errorId]}
              action={() => handleModalAction(errorId)}
            />
        }
        {
          isSendingOrder &&
            <div className={styles.loader}>
              <Loader 
                classes={['small', 'red']}
              />
            </div> 
        }
        {
          isOrderSuccess && 
            <OrderMessage 
              message={MESSAGES[5]}
              action={backToMainPage}
            />
        }
        {
          isOrderError &&
            <OrderMessage
              message={MESSAGES[4]}
              action={resetFormState}
            />
        }
      </div>
     );
  }
}

OrderPanel.propTypes = {
  isFetchingSeats: PropTypes.bool.isRequired,
  isFetchingError: PropTypes.bool.isRequired, 
  isSendingOrder: PropTypes.bool.isRequired,
  isOrderSuccess: PropTypes.bool.isRequired,
  isOrderError: PropTypes.bool.isRequired,
  resetFormState: PropTypes.func.isRequired,
  orderTickets: PropTypes.func.isRequired,
  token: PropTypes.string,
  showId: PropTypes.string.isRequired,
  chosenSeats: PropTypes.arrayOf(PropTypes.string).isRequired,
  seats: PropTypes.array.isRequired,
  handleToggleSeat: PropTypes.func.isRequired,
  handleCancelTicket: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  userData: PropTypes.object,
};
 
export default withRouter(OrderPanel);