import React from 'react';
import PageHeader from '../../layout/PageHeader/PageHeader';
import Section from '../../layout/Section/Section';
import Contact from '../../features/Contact/Contact';
import styles from './About.module.scss';

const About = () => {
  return ( 
    <div>
      <PageHeader 
        img="/images/cinema/entry.jpg"
      />
      <Section 
        title="ABOUT US"
      >
        <p className={styles.paragraph}>
          Curabitur porta ultrices tortor, ac condimentum lorem pretium a. Cras at finibus risus, sed dignissim libero. Pellentesque mattis pellentesque magna nec scelerisque. Morbi rhoncus elementum ornare. Curabitur et ligula non lectus pharetra mollis. Donec in iaculis velit. In tincidunt dui eget quam posuere, vitae tincidunt ligula laoreet. Ut fringilla sed nisl sed pellentesque. Quisque tempus quam quis faucibus tincidunt. In accumsan tincidunt lorem, vitae blandit urna tempor quis. Nunc tortor purus, finibus ullamcorper eros vel, pulvinar efficitur libero.
        </p>
        <p className={styles.paragraph}>
           Ut fringilla sed nisl sed pellentesque. Quisque tempus quam quis faucibus tincidunt. In accumsan tincidunt lorem, vitae blandit urna tempor quis. Nunc tortor purus, finibus ullamcorper eros vel, pulvinar efficitur libero.
        </p>
      </Section>
      <Section
        title="CONTACT"
      >
        <Contact />
      </Section>
    </div>
   );
}
 
export default About;
