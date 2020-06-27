import { useState, useCallback, useEffect } from 'react';
import useMedia from './useMedia';

export const PANEL = {
  LEFT: -30,
  CENTER: -50,
  RIGHT: -70,
}

const useMobilePanel = () => {
  const [translateX, updateTranslateX] = useState(PANEL.CENTER);
  const [startX, setStartX] = useState(0);
  const [xPos, setXPos] = useState(0);

  const isMobile = useMedia('(max-width: 561px)');

  useEffect(() => {
    if(!isMobile) {
      updateTranslateX(PANEL.CENTER);
    }
  }, [isMobile]);

  const goToLeft = useCallback(() => {
    updateTranslateX(prevTranslX => prevTranslX > PANEL.LEFT ? prevTranslX : prevTranslX + 25);
    setXPos(0);
  }, [updateTranslateX]);
  const goToRight = useCallback(() => {
    updateTranslateX(prevTranslX => prevTranslX < PANEL.RIGHT ? prevTranslX : prevTranslX -25);
    setXPos(0);
  }, [updateTranslateX]);

  const onSwipe = useCallback((e) => {

    if(xPos === 0) return;

    if(startX > (xPos + 100)) {
      goToRight();
    } else if (startX < (xPos - 100)) {
      goToLeft();
    }
  }, [startX, xPos, goToLeft, goToRight]);

  return {
    translateX,
    isMobile,
    goToLeft,
    goToRight,
    setStartX,
    setXPos,
    onSwipe,
  };
}

export default useMobilePanel;