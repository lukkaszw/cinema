import React, { Component } from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../common/IconButton/IconButton';
import Cart from '../Cart/Cart';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Slider.module.scss';

import interval from '../../../config/comingFilmsInterval';

class CartSlider extends Component {
  state = { 
    activeCart: 0,
    intervalDirection: 1,
  }

  componentDidMount() {
    this.startInterval();
  }

  componentWillUnmount() {
    this.clearTimeout();
    this.clearInterval();
  }

  startInterval = () => {
    this.clearTimeout();
    this.intervalId = setInterval(this.setCartByInterval, interval.speed);
  }

  clearInterval = () => {
    if(this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  clearTimeout = () => {
    if(this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  startIntervalAgain = () => {
    if(!this.interval) {
      this.timeout = setTimeout(() => {
        this.startInterval();
      }, interval.break);
    }
  }

  setCartByInterval = () => {
    const { data } = this.props;
    const { activeCart, intervalDirection } = this.state;
    const lastCart = data.length - 1;
    if(activeCart === 0) {
      this.setState(prevState => ({
        activeCart: prevState.activeCart + 1,
        intervalDirection: 1,
      }));
    } else if (activeCart === lastCart) {
      this.setState(prevState => ({
        activeCart: prevState.activeCart - 1,
        intervalDirection: -1,
      }));
    } else {
      this.setState(prevState => ({
        activeCart: prevState.activeCart + intervalDirection,
      }));
    }
  }

  goToPreviousCart = () => {
    this.clearInterval();
    this.clearTimeout();
    this.startIntervalAgain();
    if(this.state.activeCart === 0) return;
    this.setState(prevState => ({
      activeCart: prevState.activeCart - 1,
      intervalDirection: -1,
    }));
  }

  goToNextCart = () => {
    this.clearInterval();
    this.clearTimeout();
    this.startIntervalAgain();
    const lastCart = this.props.data.length - 1;
    if(this.state.activeCart === lastCart) return;
    this.setState(prevState => ({
      activeCart: prevState.activeCart + 1,
      intervalDirection: 1,
    }));
  }

  render() { 
    const { data, cartHeight, cartWidth } = this.props;
    const { activeCart } = this.state;
    const { goToNextCart, goToPreviousCart } = this;
    const allCartsAmount = data.length;

    return ( 
      <div className={styles.root}>
        <div className={styles.slider} style={{height: `${cartHeight + 30}px`}} >
          <ul 
            className={styles.cartsList}
            style={{ transform: `translateX(${-100 * activeCart/(allCartsAmount + 4)}%)`}}
          >
            {
              data.map((cartData, index) => (
                <li 
                  key={cartData._id}
                  style={{ width: `${cartWidth}px`}}
                  className={clsx([styles.cartWrapper, activeCart === index && styles.active ])}
                >
                  <Cart {...cartData} />
                </li>
              ))
            }
            <li
              className={styles.advert}
              style={{ width: `${cartWidth * 4}px`}}
            >
              <img 
                src="/images/advert.jpg" 
                alt="Advert" 
              />
            </li>
          </ul>
          <div className={styles.panel}>
            <IconButton 
              icon={faChevronLeft}
              disabled={activeCart >= allCartsAmount - 1}
              action={goToNextCart}
            />
            <p>{`${allCartsAmount} upcoming movies`}</p>
            <IconButton 
              icon={faChevronRight}
              disabled={activeCart === 0}
              action={goToPreviousCart}
            />
          </div>
        </div>
      </div>
     );
  }
}

CartSlider.propTypes = {
  data: PropTypes.array.isRequired,
  cartWidth: PropTypes.number,
  cartHeight: PropTypes.number,
};

export default CartSlider;