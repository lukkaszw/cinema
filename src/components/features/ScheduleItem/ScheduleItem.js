import React, { Component } from 'react';
import ButtonsList from '../ButtonsList/ButtonsList';
import ScheduleWeek from './ScheduleWeek/ScheduleWeek';
import ScheduleHeader from './ScheduleHeader/ScheduleHeader';
import ScheduleImage from './ScheduleImage/ScheduleImage';
import PropTypes from 'prop-types';
import styles from './ScheduleItem.module.scss';
import sortByHour from '../../../utils/sortByHour/sortByHour';

class ScheduleItem extends Component {
  state = {
    weekNr: 0,
    daysOfWeek: [],
    filter: null,
  }

  MIN_WEEK_NR = 0;
  MAX_WEEK_NR = 3;
  DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  MONDAY_IN_WEEK = 1;
  DAY_IN_MS = 86400000;
  buttons = []

  componentDidMount() {
    this.generateFilterBtns();
    this.generateWeek();
  }

  componentDidUpdate(prevProps, prevState) {
    if((this.state.weekNr !== prevState.weekNr) || (this.state.filter !== prevState.filter)) {
      this.generateWeek();
    }
  }

  getNumberFromHour = (hour) => {
    const hourNr = parseInt(hour.split(':')[0]);
    const minutNr = parseInt(hour.split(':')[1]) / 60;
    return hourNr + minutNr;
  }

  getNextWeek = () => {
    if(this.state.weekNr === this.MAX_WEEK_NR) return;

    this.setState(prevState => ({
      weekNr: prevState.weekNr + 1,
    }));
  }

  getPrevWeek = () => {
    if(this.state.weekNr === this.MIN_WEEK_NR) return;

    this.setState(prevState => ({
      weekNr: prevState.weekNr - 1,
    }));
  }

  generateFilterBtns() {
    const filters = this.props.filters;
    const forBtn = filters.filter(filtr => filtr !== 'for kids');
    if(forBtn.length > 1) {
      forBtn.unshift('all');
    }
    forBtn.forEach((filter, index) => {
        const button = {
          key: index + 1,
          value: filter,
          title: filter.toUpperCase(),
        };
        this.buttons.push(button);
    });

    this.setState({
      filter: forBtn.length > 1 ? 'all' : forBtn[0],
    });
  }

  setFilter = (filter) => {
    this.setState({
      filter,
    });
  }
  
  generateWeek = () => {
    const { weekNr, filter } = this.state;
    const { shows, filters } = this.props;
    let filterToFunc = null;
    if(filters.length > 1 && filter !== 'all') {
      filterToFunc = filter;
    }

    const daysOfWeek = this.getWeek(weekNr, shows, filterToFunc);
    this.setState({
      daysOfWeek,
    });
  }

  getWeek = (weekNr, allShows, filter) => {
    const { DAY_IN_MS, DAYS, MONTHS, MONDAY_IN_WEEK } = this;
    const nowDate = new Date();
    const dayOfWeekToday = nowDate.getDay();
    let difference = dayOfWeekToday - MONDAY_IN_WEEK;
    if(difference < 0) {
      difference = 6;
    }
    difference -= weekNr * 7;
    const relatedDate = new Date(nowDate);
    const mondayDate = relatedDate.setDate(relatedDate.getDate() - difference);

    const weekDays = DAYS.map((day, index) => {
      const dayDate = new Date(mondayDate + (index * DAY_IN_MS));
      const dayNr = dayDate.getDate();
      const shows = allShows.filter(show => {
        if(filter) {
          return show.day === dayNr && show.category === filter;
        }
        return show.day === dayNr;
      })
      .map(show => ({
        _id: show._id,
        startAt: show.startAt,
      }));

      if(shows.length > 0) {
        sortByHour(shows);
      }

      return ({
        day,
        dayNr,
        month: MONTHS[dayDate.getMonth()],
        isBefore: dayDate.getTime() < nowDate.getTime(),
        isToday: dayDate.getTime() === nowDate.getTime(),
        shows,
      });
    });
  
    return weekDays;
  }

  render() {
    const { title, duration,  categories, img, rate } = this.props;
    const { daysOfWeek, filter, weekNr } = this.state;
    const { buttons, setFilter, getPrevWeek, getNextWeek, MIN_WEEK_NR, MAX_WEEK_NR } = this;

    return ( 
      <article className={styles.root}>
        <ScheduleImage 
          img={img}
          title={title}
        />
        <div className={styles.rightPart}>
          <ScheduleHeader 
            duration={duration}
            categories={categories}
            rate={rate}
            title={title}
          />
          <ButtonsList 
            buttons={buttons}
            value={filter}
            action={setFilter}
          />
          <ScheduleWeek 
            getPrev={getPrevWeek}
            prevDisabled={weekNr <= MIN_WEEK_NR}
            nextDisabled={weekNr >= MAX_WEEK_NR}
            getNext={getNextWeek}
            days={daysOfWeek}
          />

        </div>
      </article>
     );
  }
}

ScheduleItem.propTypes = {
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  shows: PropTypes.arrayOf(PropTypes.object),
};

ScheduleItem.defaultProps = {
  shows: [],
};
 
export default ScheduleItem;
