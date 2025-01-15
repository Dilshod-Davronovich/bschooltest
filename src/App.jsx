import { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase';
import './App.css';
import AminPanel from './components/AminPanel';
import Welcome from './components/Welcome';
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
<<<<<<< HEAD
         <AminPanel />
=======
         <Welcome changeTestCode={changeTestCode} />
         <WordDragAndDrop />
         <WorkWindow />
>>>>>>> 68bb4426a87e2ae7ba4e077cd4c69460c399db9f
      </>
   );
}

export default App;
