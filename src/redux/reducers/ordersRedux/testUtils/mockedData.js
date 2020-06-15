export const mockedData = {
  seats: ['1A', '3C', '7D'],
  showId: 'someShowId',
  name: 'Name',
  surname: 'Surname',
  phone: '666666666',
  email: 'someemail@gmail.com',
};

export const mockedUserData = [
  {
    name: 'Name1',
    surname: 'Surname1',
    phone: '111 111 111',
    email: 'email1@gmail.com',
  },
  {
    name: 'Name2',
    surname: 'Surname2',
    phone: '222 222 222',
    email: 'email2@gmail.com',
  },
];

export const mockedUserOrders = [
  {
    _id: '1',
    ...mockedUserData[0],
  },
  {
    _id: '2',
    ...mockedUserData[1],
  }
];