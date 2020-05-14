import React from 'react';
import CheckboxesList from '../../../common/CheckboxesList/CheckboxesList';
import Modal from '../../../common/Modal/Modal';
import PropTypes from 'prop-types';
import genres from '../genres';
import clsx from 'clsx';
import styles from './GenreModal.module.scss';

const GenreModal = ({ toggleAction, values, foundMoviesAmount, closeModal }) => {
  return ( 
    <Modal closeAction={closeModal}>
      <p className={styles.foundInfo}>
        <strong 
          className={clsx([styles.count, !foundMoviesAmount && styles.null])}
        >{foundMoviesAmount} </strong> 
        movies've been found!*
      </p>
      <CheckboxesList 
        items={genres}
        values={values}
        toggleAction={toggleAction}
      />
      <p className={styles.info}>
        <span>* select genres to see movies you want.</span>
        <span>* no genre means that all movies will be found.</span>
      </p>
    </Modal>
   );
}

GenreModal.propTypes = {
  toggleAction: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.string),
  foundMoviesAmount: PropTypes.number,
  closeModal: PropTypes.func.isRequired,
};
 
export default GenreModal;