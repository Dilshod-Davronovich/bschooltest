// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
// import AminPanel from './components/AminPanel';
import Welcome from './components/Welcome';
// import WordDragAndDrop from './components/WordToObj';
import WorkWindow from './components/WorkWindow';
import Login from './components/Login';
// import SignUp from './components/SignUp';
// import Rating from './components/Rating';

function App() {
   // const [testId, setTestId] = useState('');

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
         <Router>
            <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/welcome" element={<Welcome />} name='welcome' />
               <Route path="/test/:id" element={<WorkWindow />} />
            </Routes>
         </Router>
      </>
   );
}

export default App;
