// import users from './Users';
import styles from './AdminPanel.module.css';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase';
import { useEffect, useState } from 'react';
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataRef = ref(database, 'Users/list');
const Rating = () => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      onValue(dataRef, (snapshot) => {
         const data = snapshot.val();
         const AllUsers = JSON.parse(data);

         const sortedUsers = [...AllUsers].sort((a, b) => b.ball - a.ball);
         console.log(sortedUsers);
         setUsers(sortedUsers);
      });
   }, []);

   return (
      <div className={styles.container}>
         <ol>
            {users.map((user, index) => (
               <li key={index}>
                  <ul>
                     <li>
                        <div className={styles.imageWrapper}>
                           <img
                              src={user.image}
                              alt={`${user.name} rasmi`}
                              style={{ width: '120px', height: '120px' }}
                           />
                        </div>
                     </li>
                     <li
                        className={styles.fontStyle}
                        style={{ color: '#ffa500' }}
                     >
                        {user.name}
                     </li>
                  </ul>
                  <ul>
                     <li
                        className={styles.fontStyle}
                        style={{ color: '#0099ff' }}
                     >
                        {user.group}
                     </li>
                     <li className={styles.fontStyle}>
                        <a
                           href={user.site}
                           target="_blank"
                           style={{ color: '#40826d' }}
                        >
                           Sayt
                        </a>
                     </li>
                     <li className={styles.fontStyle}>
                        <a
                           href={user.telegram}
                           target="_blank"
                           style={{ color: '#0099' }}
                        >
                           Telegram
                        </a>
                     </li>
                     <li
                        className={styles.fontStyle}
                        style={{ color: '#FF2600' }}
                     >
                        {user.tell}
                     </li>
                  </ul>
                  <div
                     className={styles.progress}
                     style={{
                        '--i': `${user.ball}`,
                        '--clr':
                           user.ball < 50
                              ? 'red'
                              : user.ball < 75
                              ? 'orange'
                              : '#43f94a',
                     }}
                  >
                     <h3>
                        {user.ball}
                        <span>%</span>
                     </h3>
                  </div>
               </li>
            ))}
         </ol>
      </div>
   );
};

export default Rating;
