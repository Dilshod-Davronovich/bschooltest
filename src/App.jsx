import { useState } from 'react';

import './App.css';
import AminPanel from './components/AminPanel';
import Welcome from './components/Welcome';
import WordDragAndDrop from './components/WordToObj';
import WorkWindow from './components/WorkWindow';

function App() {
   const [testId, setTestId] = useState('');

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
         <AminPanel />
         <Welcome changeTestCode={changeTestCode} />
         <WordDragAndDrop />
         <WorkWindow />
      </>
   );
}

export default App;
