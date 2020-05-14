import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './MovieListItem.module.scss';

const MovieListItem = ({ _id, title, smallImg, details, categories, filters, played, playDate, duration }) => {
  return ( 
    <li className={styles.root}>
      <Link 
        className={styles.link}
        to={`/movies/${_id}`}
      >
        <div className={styles.imageWrapper}>
          <img 
            className={styles.image}
            src={smallImg} alt={title} 
          />
        </div>
        <div className={styles.description}>
          <div className={styles.header}>
             <h3 className={styles.title}>{title}</h3>
             {
               details.rating &&
                <span className={styles.rate}>
                  IMDB {details.rating}
                </span>
             }
          </div>
          <p className={styles.categories}>
             {categories.join(' ')}
          </p>
          <p className={styles.direction}>
            dir. {details.direction}
          </p>
          <p className={styles.lang}>
             {details.language}
          </p>
          { 
            duration &&
            <p className={styles.duration}>
              {duration} min
            </p>
          }
        </div>
        <div className={clsx([styles.playTime, played === 'current' && styles.active])}>
          { 
            played === 'current' ? 
              'AVAILABLE NOW!' : 
              `${playDate ? `FROM ${playDate}!` : 'COMING SOON!'}`
          }
        </div>
        {
          filters &&
            <ul className={styles.filters}>
              {
                filters.map(filter => (
                  <li 
                    className={clsx([
                      styles.filter, 
                      filter === 'for kids' && styles.kids,
                      filter === '3d' && styles.threeD
                    ])}
                    key={filter}
                  >
                    {filter === 'for kids' ? 'KID' : filter}
                  </li>
                ))
              }
            </ul>
        }
      </Link>
    </li>
   );
}

MovieListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  smallImg: PropTypes.string.isRequired,
  details: PropTypes.shape({
    direction: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    rating: PropTypes.number,
  }),
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  filters: PropTypes.arrayOf(PropTypes.string),
  played: PropTypes.string,
  playDate: PropTypes.string,
}
 
export default MovieListItem;