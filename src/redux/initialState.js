const initialState = {
  auth: {
    token: null,
  },
  user: {
    data: {},
    loading: {
      isActive: false,
      isError: false,
    },
  },
  movies: {
    data: [],
    filtersFor: {
      all: {
        filter: 'all',
        searchText: '',
        playTime: 'all',
        sort: 'asc',
        genres: [],
        page: 1,
      },
      current: 'all',
    },
    loading: {
      isActive: false,
      isError: false,
    },
  },
  schedule: {
    data: [],
    loading: {
      isActive: false,
      isError: false,
    },
    filters: {
      page: 1,
      searchText: '',
    }
  },
  show: {
    data: {},
    loadingData: {
      isActive: false,
      isError: false,
    },
  },
  seats: {
    data: [],
    loading: {
      isActive: false,
      isError: false,
    }
  },
  orders: {
    userOrders: [],
    orderToEdit: {},
    loading: {
      isActive: false,
      isError: false,
    },
  },
  moviePage: {
    data: {},
    loading: {
      isActive: false,
      isError: false,
    }
  },
  searchPanel: {
    data: [],
    query: '',
    loading: {
      isActive: false,
      isError: false,
    }
  },
  formsState: {
    destination: null,
    sending: {
      isActive: false,
      isError: false,
      isSuccess: false,
    },
    message: '',
  }
};

export default initialState;