import React from 'react';
import PropTypes from 'prop-types';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../IconButton/IconButton';
import styles from './Gallery.module.scss';
import useGallery from './useGallery';

const Gallery = ({ gallery, title, padImage }) => {

  const { activeImg, goToPrev, goToNext, setStartX, setXPos, onSwipe } = useGallery(gallery);

  return ( 
    <div 
      className={styles.root}
    >
      <img className={styles.pad} src={padImage} alt={title} />
      <ul 
        onTouchStart={(e) => setStartX(e.touches[0].clientX)}
        onTouchMove={e => setXPos(e.touches[0].clientX)}
        onTouchEnd={onSwipe}
        style={{
          transform: `translateX(-${(activeImg/gallery.length) * 100}%)`,
        }}
        className={styles.list}
      >
        {
          gallery.map((imgSrc, i) => (
            <img 
              key={`${title}-${i}`} 
              className={styles.img}
              src={imgSrc} 
              alt={`${title}-${i}`} 
            />
          ))
        }
      </ul>
      <div className={styles.btnPrev}>
        <IconButton 
          action={goToPrev}
          icon={faChevronLeft} 
          disabled={activeImg <= 0}
        />
      </div>
      <div className={styles.btnNext}>
        <IconButton
          action={goToNext}
          icon={faChevronRight}
          disabled={activeImg >= gallery.length - 1}
        />
      </div>
      <div className={styles.descr}>
        {`${activeImg + 1}/${gallery.length}`}
      </div>
    </div>
   );
}

Gallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
};
 
export default Gallery;