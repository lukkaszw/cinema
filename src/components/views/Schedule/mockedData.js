const mockedData = [];

for(let i = 1; i <= 18; i++) {
  const movie = {
    _id: `${i}`,
    title: `Title ${i}`,
    categories: ['Comedy'],
    img: `image-${i}.jpg`,
    rate: i,
    filters: ['2d'],
    shows: [{
      _id: `${i}${i}`,
    }],
    duration: i,
  };
  mockedData.push(movie);
}

export default mockedData;