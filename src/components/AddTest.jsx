import { useEffect, useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase';
import styles from './AdminPanel.module.css';
import WordDragAndDrop from './WordToObj';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const AddTest = () => {
   const [sarlavha, setSarlavha] = useState('');
   const [idRaqami, setId] = useState('');
   const [testObjectList, setTestObjectList] = useState([]);
   const [complated, setComplated] = useState(false);
   const [showMassage, setSHowMassage] = useState(false);
   const [openWindow, setOpenWindow] = useState(true);
   const [checkInputTitle, setcheckInputTitle] = useState(false);
   const [checkInputId, setcheckInputId] = useState(false);
   const [checkWordFile, setcheckWordFile] = useState(false);

   const [checkFirst, setCheckFirst] = useState(false);

   const saveToFirebase = () => {
      if (!sarlavha) setcheckInputTitle(true);
      if (!idRaqami) setcheckInputId(true);
      if (testObjectList.length === 0) setcheckWordFile(true);

      if (sarlavha && idRaqami && testObjectList.length > 0) {
         const testList = [sarlavha, testObjectList];
         const testlar = JSON.stringify(testList);
         set(ref(database, 'tests/' + idRaqami), { testlar });

         setComplated(false);
         setSarlavha('');
         setId('');
         setSHowMassage(true);
         setTimeout(() => setSHowMassage(false), 5000);
      }
   };

   useEffect(() => {
      if (sarlavha) setcheckInputTitle(false);
      if (idRaqami) setcheckInputId(false);
      if (testObjectList.length > 0) setcheckWordFile(false);
   }, [sarlavha, idRaqami, testObjectList]);

   return (
      <div
         className={
            !checkFirst
               ? `${styles.adminWindow}`
               : `${styles.adminWindow} ${
                    openWindow ? styles.closeWindow : styles.openWindow
                 }`
         }
      >
         <button
            className={
               !checkFirst
                  ? `${styles.openBtn}`
                  : `${styles.openBtn} ${
                       openWindow ? styles.closeRotateBtn : styles.openRotateBtn
                    }`
            }
            onClick={() => {
               setOpenWindow(!openWindow);
               if (!checkFirst) {
                  setCheckFirst(true);
               }
            }}
         ></button>
         <h1
            onClick={() => {
               setOpenWindow(!openWindow);
               if (!checkFirst) {
                  setCheckFirst(true);
               }
            }}
         >
            Yangi test qo'shish
         </h1>
         <div>
            <label>Sarlavhasi </label>
            <input
               style={{
                  border: checkInputTitle
                     ? '2px solid red'
                     : '2px solid lightblue',
               }}
               value={sarlavha}
               type="text"
               onChange={(event) => setSarlavha(event.target.value)}
            />
         </div>
         <div>
            <label>Id raqami </label>
            <input
               style={{
                  border: checkInputId
                     ? '2px solid red'
                     : '2px solid lightblue',
               }}
               value={idRaqami}
               type="text"
               onChange={(event) => setId(event.target.value)}
            />
         </div>
         <WordDragAndDrop
            testObjectList={testObjectList}
            setTestObjectList={setTestObjectList}
            complated={complated}
            setComplated={setComplated}
         />
         <button onClick={saveToFirebase}>Saqlash</button>
         {showMassage && (
            <div className={styles.showMassage}>Testlar bazaga saqlandi!!!</div>
         )}
      </div>
   );
};

export default AddTest;
