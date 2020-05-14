import { useState, useCallback, useEffect } from 'react';

const useSearchedItems = (propsActions, propsValues ) => {
  const { setPlayTime,  setFilter, changeInput, toggleGenre } = propsActions;
  const { inputText, filter, playTime, genres } = propsValues;

  const [searchedItems, setItems] = useState([]);

  const resetPlayTime = useCallback(() => setPlayTime('all'), [setPlayTime]);
  const resetFilter = useCallback(() => setFilter('all'), [setFilter]);
  const resetInput = useCallback(() => changeInput(''), [changeInput]);
  const createItem = useCallback((value, removeAction) => ({ value, removeAction }), []);

  useEffect(() => {
    let items = [];
    if(inputText) {
      items.push(createItem(inputText, resetInput));
    }

    if(filter !== 'all' && playTime !== 'soon') {
      items.push(createItem(filter, resetFilter));
    }

    if(playTime !== 'all') {
      items.push(createItem(playTime, resetPlayTime));
    }

    items = items.concat(genres.map(genre => createItem(genre, () => toggleGenre(genre))));

    setItems(items);

  }, [inputText, resetInput, filter, resetFilter, playTime, resetPlayTime, genres, toggleGenre, createItem ]);

  return searchedItems;
}

export default useSearchedItems;