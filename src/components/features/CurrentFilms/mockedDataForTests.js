export const mockedPropsWhenLoading = {
  isLoading: true,
  filter: 'all',
  fetchMovies: jest.fn(),
  setFilter: jest.fn(),
};


const oneMovie =     {
  title: 'Title test',
  duration: 120,
  categories: ['Action', 'Drama'],
  image: '/images/carts/image-test.jpg',
};

const mockedMovies = [];

for(let i = 0; i < 18; i++) {
  mockedMovies.push({
    id: `${i}`,
    ...oneMovie,
  });
}

export const mockedPropsWithData = {
  isLoading: false,
  isError: false,
  filter: 'all',
  movies: mockedMovies,
  fetchMovies: jest.fn(),
  setFilter: jest.fn(),
}

export const mockedScreenSizes = [
  {
    query: '(min-width: 1201px)',
    sizes: [2420, 1920, 1201],
    hasCartsAmount: 10,
  },
  {
    query: '(min-width: 921px)',
    sizes: [1200, 1000, 921],
    hasCartsAmount: 8,
  },
  {
    query: '(min-width: 701px)',
    sizes: [920, 858, 701],
    hasCartsAmount: 6,
  },
  {
    query: '(min-width: 701px)',
    sizes: [700, 360, 1],
    hasCartsAmount: 4,
  },
];

