const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export const getDate = (day) => {
  const date = `${MONTHS[new Date().getMonth()]} ${day}`;
  return date;
}