import React from 'react';
import styles from './Table.module.scss';

const Table = ({ data }) => {
  return ( 
    <table className={styles.root}>
      <tbody>
        {
          data.map((row, index) => (
            <tr key={row._id}>
              {
                Object.keys(row).map(columnName => {
                  if (columnName !== '_id' && row[columnName]) {
                    return ((
                      <td key={columnName + row._id}>
                        {row[columnName]}
                      </td>
                    ))
                  }
                  return null;
                })  
              }
            </tr>
          ))
        }
      </tbody>
    </table>
   );
}
 
export default Table;