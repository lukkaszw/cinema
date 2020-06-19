const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const getDate = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = MONTHS[dateObj.getMonth()];
  return `${day} ${month}`;
}

module.exports = getDate;