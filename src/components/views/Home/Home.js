import React from 'react';
import EntryPanel from '../../layout/EntryPanel/EntryPanel';
import Section from '../../layout/Section/Section';

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
      />
      <Section 
        title="COMMING SOON"
      />
    </div>
  );
}

export default Home;