import { useState } from 'react';
import styles from './AdminPanel.module.css';
import WordDragAndDrop from './WordToObj';

function saveToFirebase() {
   console.log(styles);
}

const AminPanel = () => {
   const [sarlavha, setSarlavha] = useState('');
   const [idRaqami, setId] = useState('');

   console.log(sarlavha, idRaqami);
   return (
      <div className={styles.adminWindow}>
         <h1>Adminstrator paneli</h1>
         <label>
            Sarlavhasi
            <input
               type="text"
               onChange={(event) => setSarlavha(event.target.value)}
            />
         </label>

         <label>
            Id raqami
            <input
               type="text"
               onChange={(event) => setId(event.target.value)}
            />
         </label>
         <WordDragAndDrop />
         <button onClick={saveToFirebase}>Saqlash</button>
      </div>
   );
};

export default AminPanel;
