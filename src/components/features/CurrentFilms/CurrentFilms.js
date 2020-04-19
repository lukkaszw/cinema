import React, { Component } from 'react';
import Button from '../../common/Button/Button';
import ButtonsList from '../ButtonsList/ButtonsList';
import Loader from '../../common/Loader/Loader';
import CartsList from '../../common/CartsList/CartsList';
import PropTypes from 'prop-types';
import styles from './CurrentFilms.module.scss';



class CurrentFilms extends Component {

  state = {
    cartsInList: 10,
    lists: 1,
  }

  queries = {
    large: '(min-width: 1201px)',
    big: '(min-width: 921px)',
    medium: '(min-width: 701px)',
  }

  cartsAmounts = {
    large: 10,
    big: 8,
    medium: 6,
    small: 4,
  }

  categoriesButtons = [
    {
      key: 1,
      value: 'all',
      title: 'All',
    },
    {
      key: 2,
      value: '3d',
      title: '3D',
    },
    {
      key: 3,
      value: '2d',
      title: '2D'
    },
    {
      key: 4,
      value: 'for kids',
      title: 'Kids',
    }
  ]

  componentDidMount() {
    if(this.props.movies.length === 0) {
      this.props.fetchMovies();
    }
    this.setCartsInList();
    this.checkCartsAmount();
  }

  setCartsInList = () => {
    const width = window.innerWidth;
    let cartsInList = 4;
    if(width > 1200) {
      cartsInList = 10;
    } else if (width > 920) {
      cartsInList = 8;
    } else if (width > 700) {
      cartsInList = 6;
    }

    if(cartsInList !== this.state.cartsInList) {
      this.setState({
        cartsInList,
      });
    }
  }

  checkCartsAmount = () => {
    const queries = this.queries;
    this.matches = {};
    this.checkers = {};
    Object.keys(queries).forEach(query => {
      this.checkers[query] = () => this.setCartsInList();
      this.matches[query] = window.matchMedia(queries[query]).addEventListener('change', this.checkers[query]);
    });
  }

  getMoreCarts = () => {
    const allMoviesAmount = this.props.movies.length;
    const { cartsInList, lists } = this.state;
    const maxLists = Math.ceil(allMoviesAmount / cartsInList);
    if(lists >= maxLists) return;

    this.setState(prevState => ({
      lists: prevState.lists + 1,
    }))
  }

  getGeneratedCarts = () => {
    const { cartsInList, lists } = this.state;
    return this.props.movies.slice(0, cartsInList * lists);
  }

  render() {
    const { isLoading, movies, filter, setFilter, isError } = this.props;
    const { cartsInList, lists } = this.state;
    const { getGeneratedCarts, getMoreCarts, categoriesButtons } = this;

    return ( 
      <div className={styles.root}>
        <div className={styles.btns}>
          <ButtonsList 
            buttons={categoriesButtons}
            action={setFilter}
            value={filter}
          />
        </div>
        <CartsList movies={getGeneratedCarts()} />
        {
          !isLoading && movies.length === 0 &&
            <p className={styles.noFound}>
              No movies were found. Please try to update searching criteria and try again. If you have chosen all movies and nothing was found, please try again later!
            </p>
        }
        {
          cartsInList * lists < movies.length &&
            <div className={styles.moreBtn}>
              <Button
                action={getMoreCarts}
                variants={['inline', 'red']}
              >
                ...MORE
              </Button>
            </div>
        }
        {
         isLoading && 
          <div className={styles.loader}>
            <Loader classes={['red', 'small']}/>
          </div>
        }
      </div>
     );
  }
}

CurrentFilms.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object),
  fetchMovies: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

CurrentFilms.defaultProps = {
  movies: [],
}
 
export default CurrentFilms;