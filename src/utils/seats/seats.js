export const SEATS = [];

export const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
const COLUMNS = {
  A: 19,
  B: 21,
  C: 23,
  D: 23,
  E: 23,
  F: 23,
  G: 23,
  H: 25,
  I: 25,
  J: 25,
  K: 25,
  L: 25,
  M: 25,
  N: 25,
}

Object.keys(COLUMNS).forEach(row => {
  const rowsSeats = [];
  for(let i = 1; i <= COLUMNS[row]; i++) {
    rowsSeats.push({
      seatId: `${i}${row}`,
      ordered: false,
    });
  }
  SEATS.push(rowsSeats);
});