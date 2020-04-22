import React from 'react';
import Table from '../../common/Table/Table';
import PropTypes from 'prop-types';
import styles from './Details.module.scss';


const Details = ({ title, description, duration, direction, country, language, cast, releaseDate }) => {
  const tableData = [
    { _id: '1', label: 'Country:', value: country || 'unknown' },
    { _id: '2', label: 'Language:', value: language || 'unknown' },
    { _id: '3', label: 'Direction:', value: direction || 'unknown' },
    { _id: '4', label: 'Release date:', value: releaseDate || 'unknown' },
    { _id: '5', label: 'Duration:', value: duration || 'unknown' },
  ];

  return ( 
    <div className={styles.root}>
      <div className={styles.details}>
        <article className={styles.data}>
          <Table data={tableData} />
        </article>
        <div className={styles.divide}></div>
        <article className={styles.storyLine}>
          <h3 className={styles.title}>{title}</h3>
          {
            description.map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))
          }
        </article>
      </div>
      <div className={styles.cast}>
        <h4 className={styles.title}>Cast:</h4>
        <ul className={styles.list}>
          {
            cast.map((actor, index) => (
              <li key={index}>
                <a 
                  className={styles.actor}
                  href={actor.link} 
                  target="__blank"
                >
                  {actor.name}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
   );
}

Details.propTypes = {
  description: PropTypes.arrayOf(PropTypes.string),
  country: PropTypes.string,
  language: PropTypes.string,
  direction: PropTypes.string,
  releaseDate: PropTypes.string,
  duration: PropTypes.string,
  title: PropTypes.string,
  cast: PropTypes.arrayOf(PropTypes.object),
};
 

export default Details;