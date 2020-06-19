const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const MS_BEFORE_ORDER = 60 * 60 * 1000;

export const getHoursMsNow = () => {
  const hoursNow = new Date().getUTCHours() + 2;
  const minutesNow = new Date().getMinutes();
  const timeNowInMs = (hoursNow * 60 * 60 * 1000) + (minutesNow * 60 * 1000);
  return timeNowInMs;
}

export const getHoursMsFromString = (hoursString) => {
  const parts = hoursString.split(':');
  const hours = Number(parts[0]);
  const minutes = Number(parts[1]);
  const timeInMs = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
  return timeInMs;
}

export const getDate = (day) => {
  console.log('isWorking');
  const currentDate = new Date();
  const isCurrentMonth = currentDate.getDate() <= day;
  const x = isCurrentMonth ? 0 : 1;
  let monthNr = currentDate.getMonth() + x;
  monthNr = monthNr < 12 ? monthNr : 0;
  const month = MONTHS[monthNr];
  const year = currentDate.getFullYear();
  const dayNrInWeek = new Date(`${monthNr + 1}.${day}.${year}`).getDay();
  const dayName = DAYS[dayNrInWeek];

  return {
    day,
    dayName,
    month,
    year,
  };
}

export const getDateString = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = MONTHS[dateObj.getMonth()];
  return `${day} ${month}`;
}

