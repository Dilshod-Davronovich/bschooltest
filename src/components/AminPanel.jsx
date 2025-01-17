import { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase';
import styles from './AdminPanel.module.css';
import WordDragAndDrop from './WordToObj';
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const AminPanel = () => {
   const [sarlavha, setSarlavha] = useState('');
   const [idRaqami, setId] = useState('');
   const [testObjectList, setTestObjectList] = useState([]);

   function saveToFirebase() {
      if (sarlavha != '' && idRaqami != '' && testObjectList != []) {
         const testList = [sarlavha, testObjectList];
         const testlar = JSON.stringify(testList);
         set(ref(database, 'tests/' + `${idRaqami}`), {
            testlar: testlar,
         });
      }
   }

   return (
      <div className={styles.adminWindow}>
         <h1>Adminstrator paneli</h1>
         <div>
            <label>Sarlavhasi </label>

            <input
               value={sarlavha}
               type="text"
               onChange={(event) => setSarlavha(event.target.value)}
            />
         </div>

         <div>
            <label>Id raqami </label>
            <input
               value={idRaqami}
               type="text"
               onChange={(event) => setId(event.target.value)}
            />
         </div>
         <WordDragAndDrop
            testObjectList={testObjectList}
            setTestObjectList={setTestObjectList}
         />
         <button onClick={saveToFirebase}>Saqlash</button>
      </div>
   );
};

export default AminPanel;
