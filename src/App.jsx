import { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase';
import Welcome from './components/Welcome';
import './App.css';
import WordDragAndDrop from './components/WordToObj';
import WorkWindow from './components/WorkWindow';

function App() {
   const [testId, setTestId] = useState('');
   const app = initializeApp(firebaseConfig);
   const database = getDatabase(app);

   function changeTestCode(id) {
      setTestId(id);
   }

   function writeUserData(id, testlar) {
      // const db = getDatabase();
      set(ref(database, 'tests/' + `${id}`), {
         testlar: testlar,
      });
   }
   //  const birinchiTest = [
   //     {
   //        savol: 'apple nima?',
   //        a: 'olcha',
   //        b: 'gilos',
   //        c: 'olma',
   //        javob: 'olma',
   //     },
   //     {
   //        savol: 'Get nima?',
   //        a: 'olmoq',
   //        b: 'bermoq',
   //        c: 'ketmoq',
   //        javob: 'olmoq',
   //     },
   //  ];
   //  const test = JSON.stringify(birinchiTest);
   //  writeUserData(2, test);
   return (
      <>
         <Welcome changeTestCode={changeTestCode} />
         <WordDragAndDrop />
         <WorkWindow />
      </>
   );
}

export default App;
