const getNumberFromHour = (hour) => {
  const hourNr = parseInt(hour.split(':')[0]);
  const minutNr = parseInt(hour.split(':')[1]) / 60;
  return hourNr + minutNr;
}

const sortByHour = (shows) => {
  shows.sort((show, show2) => {
    const nr = getNumberFromHour(show.startAt);
    const nr2 = getNumberFromHour(show2.startAt);
    if(nr > nr2) {
      return 1;
    }
    if(nr2 > nr) {
      return -1;
    }
    return 0;
  });
}

export default sortByHour;