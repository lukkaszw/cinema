import React, { Component } from 'react';
import Page from '../../layout/Page/Page';
import Section from '../../layout/Section/Section';
import Details from '../../features/Details/Details';
import Gallery from '../../common/Gallery/Gallery';
import ScheduleItem from '../../features/ScheduleItem/ScheduleItem';
import ComingFilmInfo from '../../common/ComingFilmInfo/ComingFilmInfo';
import PageHeader from '../../layout/PageHeader/PageHeader';
import PropTypes from 'prop-types';

class Movie extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchMovieData();
  }

  fetchMovieData = () => {
    const movieId = this.props.match.params.id;
    const { data } = this.props;

    if(!data._id || (data._id !== movieId)) {
      const movieId = this.props.match.params.id;
      this.props.fetchMovieData(movieId);
    } 
  }

  

  render() {
    const { data, isLoading, isError  } = this.props;
    const { details, title, duration, categories, scheduleImg, filters, shows, played, playDate } = data;
    const pageImage = details ? details.pageImage : null;
    const imagePortrait = details ? details.imagePortrait : null;
    const gallery = details ? details.gallery : null;

    return ( 
      <Page isFetching={isLoading} isFetchingError={isError}>
        <PageHeader 
          title={data.title}
          img={pageImage}
          imgPortrait={imagePortrait}
        />
        {
          played === 'current' ?
            <Section>
              <ScheduleItem 
                title={title}
                duration={duration}
                categories={categories}
                img={scheduleImg}
                rate={details.rating}
                filters={filters}
                shows={shows}
              />
            </Section>
            :
            <ComingFilmInfo 
              playDate={playDate}
            />
        }
        
        {
          details &&
            <Section 
              title="DETAILS"
            >
              <Details 
                title={data.title}
                description={details.description}
                country={details.country}
                language={details.language}
                direction={details.direction}
                releaseDate={details.reliseDate}
                duration={duration ? `${duration} min` : null}
                cast={details.cast}
              />
            </Section>
        }
        {
          gallery &&
            <Section 
              title="GALLERY"
            >
              <Gallery 
                title={data.title}
                gallery={gallery}
                padImage='/images/gallery/pad-image.jpg'
              />
            </Section>
        }
      </Page>
     );
  }
}

Movie.propTypes = {
  fetchMovieData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

Movie.defaultProps = {
  data: {
    details: {
      description: 'unknown',
    }
  }
}
 
export default Movie;