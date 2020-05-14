const sortByAlpha = (data, order) => { 
  return [...data].sort((a, b) => {
    const respond = order === 'asc' ? -1 : 1;

    if(a.title < b.title) {
      return respond;
    }
    if(a.title > b.title) {
      return -respond;
    }
    
    return 0;
  });
}

export default sortByAlpha;