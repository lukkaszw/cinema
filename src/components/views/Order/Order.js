import React, { Component } from 'react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';
import api from '../../../config/api';
import OrderHeader from './OrderHeader/OrderHeader';
import OrderContent from './OrderContent/OrderContent';
import  TicketsPanel from '../../features/TicketsPanel/TicketsPanel'; 
import FetchError from '../../common/FetchError/FetchError';
import OrderPanel from '../../features/OrderPanel/OrderPanel.container';
import ShowsDetails from '../../features/ShowsDetails/ShowsDetails';
import LoaderIndicator from '../../common/LoaderIndicator/LoaderIndicator';
import { SEATS, ROWS } from '../../../utils/seats/seats';
import styles from './Order.module.scss';

class Order extends Component {
  state = {
    chosenSeats: [],
    seats: JSON.parse(JSON.stringify(SEATS)),
  };

  MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  PRICES = {
    '2d': 10,
    '3d': 12,
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
    this.initiateSocket();
    this.fetchData();
    const token = localStorage.getItem('tkn');
    this.fetchSeats(token);
    if(token && !this.props.userData.email) {
      this.props.fetchUserData(token);
    }

    this.initiateChosenSeats();
  }

  componentWillUnmount() {
    this.socket.close();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.orderedSeats !== this.props.orderedSeats) {
      this.generateSeats();
    }
  }
  
  initiateChosenSeats() {
    const orderToEdit = this.props.orderToEdit;
    if(orderToEdit) {
      this.setState({
        chosenSeats: [...orderToEdit.seats],
      });
    }
  }

  initiateSocket = () => {
    const showId = this.props.match.params.id;
    this.socket = openSocket(api.socket.url);
    this.socket.emit('connectToShow', showId);
    this.socket.on('loadSeats', (data) => this.props.updateSeats(data));
  }

  generateSeats() {
    const seats = [...this.state.seats];
    
    const { orderedSeats, orderToEdit } = this.props;

    const ordered = orderedSeats.filter(seatId => {
      if(orderToEdit) {
        return !orderToEdit.seats.includes(seatId);
      }
      return true;
    })

    const chosenSeats = this.state.chosenSeats.filter(seatId => !ordered.includes(seatId));

    seats.map(seatsGroup => seatsGroup.map(seat => {
        seat.chosen = chosenSeats.includes(seat.seatId);
        seat.disabled = ordered.includes(seat.seatId);
        return seat;
      }));

    this.setState({
      seats,
      chosenSeats,
    });
  }

  handleToggleSeat = (seatId) => {

    const seats = this.handleMarkChosenSeat(seatId);

    this.setState(prevState => {
      const chosenSeats = prevState.chosenSeats.includes(seatId) ? 
        prevState.chosenSeats.filter(seat => seat !== seatId) :
        prevState.chosenSeats.concat([seatId]);
      
      return ({
        chosenSeats,
        seats,
      });
    });
  }

  handleMarkChosenSeat = (seatId) => {
    const parts = seatId.split('');
    const rowId = parts[parts.length - 1];
    const rowIndex = ROWS.findIndex(id => rowId === id);
    const seats = [...this.state.seats];

    seats[rowIndex] = seats[rowIndex].map(seat => {
      if(seat.seatId === seatId) {
        seat.chosen = !seat.chosen;
      } 
      return seat;
    });

    return seats;
  }

  handleCancelTicket = (seatId) => {
    const seats = this.handleMarkChosenSeat(seatId);

    this.setState(prevState => ({
      chosenSeats: prevState.chosenSeats.filter(seat => seat !== seatId),
      seats,
    }))
  }

  fetchData = () => {
    const showId = this.props.match.params.id;
    this.props.fetchShowData(showId);
  }

  fetchSeats = (token) => {
    const showId = this.props.match.params.id;
    if(!token) {
      token = this.props.token;
    }
    this.props.fetchSeats(showId, token);
  }

  generateDate = () => {
    const { day } = this.props.showData;
    const currentDate =  new Date();
    const monthNr = currentDate.getMonth()
    const year = currentDate.getFullYear();
    const month = this.MONTHS[monthNr];
    const dayNr = new Date(`${month}.${day}.${year}`).getDay();
    const dayOfWeek = this.DAYS[dayNr];
    const date = `${day} ${month}`;
    return {
      dayOfWeek,
      date
    };
  }

  render() {
    const { 
      isFetching, 
      isFetchingError, 
      showData, 
      userData, 
      token,
      isEditing,
      orderTickets,
      orderToEdit,
      } = this.props;
    const { chosenSeats, seats } = this.state;
    const { 
      generateDate, 
      handleToggleSeat, 
      handleCancelTicket,
    } = this;
    const movie = showData.movieId || null;

    const price = this.PRICES[showData.category || '2d'];

    return ( 
      <div className={styles.root}>
        <LoaderIndicator isLoading={isFetching} />
        {
          isFetchingError ?
           <FetchError />
           :
          <>
            {
              movie &&
              <>
                <OrderHeader
                  img={movie.details.pageImage}
                  imgPortrait={movie.details.imagePortrait}
                />
                <OrderContent 
                  title={movie.title}
                >
                  <OrderPanel 
                    token={token}
                    showId={showData._id}
                    chosenSeats={chosenSeats}
                    seats={seats}
                    handleToggleSeat={handleToggleSeat}
                    handleCancelTicket={handleCancelTicket}
                    price={price}
                    userData={userData}
                    orderTickets={orderTickets}
                    isEditing={isEditing}
                    editingId={orderToEdit ? orderToEdit._id : null}
                  />
                  <ShowsDetails 
                    title={movie.title}
                    img={movie.scheduleImg}
                    date={generateDate()}
                    hour={showData.startAt}
                    hall={showData.hall}
                    technology={showData.category}
                    price={price}
                  />
                  <TicketsPanel 
                    tickets={chosenSeats}
                    price={price}
                    handleCancelTicket={handleCancelTicket}
                  />
                </OrderContent>
              </>
            }
          </>
        }
      </div>
     );
  }
  
}

Order.propTypes = {
  fetchShowData: PropTypes.func.isRequired,
  showData: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  isFetchingError: PropTypes.bool.isRequired,
  token: PropTypes.string,
  userData: PropTypes.object,
  orderedSeats: PropTypes.array,
  fetchSeats: PropTypes.func.isRequired,
  fetchUserData: PropTypes.func,
  updateSeats: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  orderToEdit: PropTypes.object,
  orderTickets: PropTypes.func.isRequired,
};

Order.defaultProps = {
  orderedSeats: [],
}
 
export default Order;