import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import OrderPanelBoards from './OrderPanelBoards/OrderPanelBoards';
import NextPrevBtns from '../../common/NextPrevBtns/NextPrevBtns';
import OrderProcessBar from './OrderProcessBar/OrderProcessBar';
import OrderMessage from './OrderMessage/OrderMessage';
import FetchError from '../../common/FetchError/FetchError';
import LoaderIndicator from '../../common/LoaderIndicator/LoaderIndicator';
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
    5: 'Your order has been added correctly. Please check your email for feedback information!',
    6: 'Your order has been edited correctly. Please check your email for feedback information!'
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
    const { showId, chosenSeats, isEditing, token, editingId, price, date, hour } = this.props;
    const totalPrice = chosenSeats.length * price;

    const orderData = {
      name,
      surname,
      phone,
      email,
      showId,
      seats: chosenSeats,
      price: totalPrice,
    }

    if(!isEditing) {
      const showDate = `${date.dayName} ${date.month} ${date.day} ${date.year} ${hour} GMT+0200`;
      orderData.showDate = showDate;
    }

    if(isEditing) {
      delete orderData.showId;
    }

    this.props.orderTickets(orderData, token, editingId);
  }

  backToMainPage = () => {
    const { history, isEditing } = this.props;
    if(isEditing) {
      history.push('/user/orders');
      return;
    }
    history.push('/schedule');
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
      isFetchingError,
      isEditing,
    } = this.props;

    return ( 
      <div className={styles.root}>
        {
          isFetchingError ?
            <FetchError />
            :
            <>
              <LoaderIndicator 
                isActive={isSendingOrder}
                top={90}
              />
              <OrderProcessBar 
                orderStep={orderStep}
              />
              <OrderPanelBoards 
                orderStep={orderStep}
                seats={seats}
                name={name}
                surname={surname}
                phone={phone}
                email={email}
                handleChangeInputValue={handleChangeInputValue}
                valuesErrors={valuesErrors}
                chosenSeats={chosenSeats}
                price={price}
                isSendingOrder={isSendingOrder}
                handleToggleSeat={handleToggleSeat}
                handleCancelTicket={handleCancelTicket}
                handleSubmitOrder={handleSubmitOrder}
              />
              <NextPrevBtns 
                goToPrevStep={goToPrevStep}
                goToNextStep={goToNextStep}
                isInactivePrev={orderStep === 1 || isSendingOrder}
                isInactiveNext={orderStep === 3 || isSendingOrder}
              />
              {
                errorId && 
                  <OrderMessage 
                    message={this.MESSAGES[errorId]}
                    action={() => handleModalAction(errorId)}
                  />
              }
              {
                isOrderSuccess && 
                  <OrderMessage 
                    message={isEditing ? MESSAGES[6] : MESSAGES[5]}
                    action={backToMainPage}
                    isSuccess
                  />
              }
              {
                isOrderError &&
                  <OrderMessage
                    message={MESSAGES[4]}
                    action={resetFormState}
                  />
              }
            </>
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
  isEditing: PropTypes.bool,
  date: PropTypes.object,
  hour: PropTypes.string,
};
 
export default withRouter(OrderPanel);