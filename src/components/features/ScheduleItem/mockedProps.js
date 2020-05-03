const mockedShows = [];
const categories = ['2d', '3d'];
const startsExamples = ['10:00', '11:30', '17:00', '20:00', '19:00', '23:00'];

for(let i = 1; i <= 31; i++) {
  mockedShows[i] = {};
  mockedShows[i]._id = i.toString();
  mockedShows[i].day = i;
  mockedShows[i].startAt = startsExamples[Math.floor(Math.random() * startsExamples.length)];
  mockedShows[i].category = categories[Math.floor(Math.random() * categories.length)];
}

const mockedProps = {
  title: 'Title',
  duration: 123,
  categories: ['Action', 'Fantasy'],
  img: '/image.jpg',
  rate: 8.2,
  filters: ['2d', '3d', 'for kids'],
  shows: mockedShows,
};

export default mockedProps;