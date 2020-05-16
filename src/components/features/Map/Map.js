import React from 'react';
import GMap from './GMap';
import styles from './Map.module.scss';

const Map = () => {
  return ( 
    <div className={styles.root}>
      <GMap 
      />
    </div>
   );
}
 
export default Map;