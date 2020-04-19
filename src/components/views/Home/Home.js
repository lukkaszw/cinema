import React from 'react';
import EntryPanel from '../../layout/EntryPanel/EntryPanel';
import CurrentFilms from '../../features/CurrentFilms/CurrentFilms.container';
import ComingFilms from '../../features/ComingFilms/ComingFilms.container';
import Section from '../../layout/Section/Section';
import data from '../../../demo/currentMoviesData.json';

const Home = () => {
  return (
    <div>
      <EntryPanel
        img="/images/entry.jpg"
        from="18 April"
        to="28 April"
        title="300 Rise of an empire"
        types={['2d', '3d']}
      />
      <Section 
        title="CURRENTLY PLAYED"
      >
        <CurrentFilms/>
      </Section>
      <Section 
        title="COMMING SOON"
      >
        <ComingFilms />
      </Section>
    </div>
  );
}

export default Home;