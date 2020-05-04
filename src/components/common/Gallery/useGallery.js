import { useState, useCallback, useEffect } from 'react';

const useGallery = (gallery) => {
  const [activeImg, setActiveImg] = useState(0);
  const [startX, setStartX] = useState(0);
  const [xPos, setXPos] = useState(0);

  const goToPrev = useCallback(() => {
    if(activeImg === 0) return;
    setActiveImg(prevActiveImg => prevActiveImg - 1);
  }, [activeImg]);

  const goToNext = useCallback(() => {
    if(activeImg === gallery.length - 1) return;
    setActiveImg(prevActiveImg => prevActiveImg + 1);
  }, [activeImg, gallery]);

  const onSwipe = useCallback((e) => {
    if(startX > (xPos + 50)) {
      goToNext();
    } else if (startX < (xPos - 50)) {
      goToPrev();
    }
  }, [startX, xPos, goToPrev, goToNext]);

  useEffect(() => {
    const slideByKeys = (e) => {
      switch(e.keyCode) {
        case 37: 
          goToPrev();
          break;
        case 39: 
          goToNext();
          break;
        default: return;
      };
    }
    window.addEventListener('keydown', slideByKeys);
    return () => {
      window.removeEventListener('keydown', slideByKeys);
    }
  });

  return ({
    activeImg,
    goToNext,
    goToPrev,
    setStartX,
    setXPos,
    onSwipe,
  });
}

export default useGallery;