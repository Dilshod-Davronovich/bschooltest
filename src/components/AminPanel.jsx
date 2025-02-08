import { useState } from 'react';
<<<<<<< HEAD
// import AddTest from './AddTest';
import styles from './AdminPanel.module.css';
import kunImg from '../assets/kun.png';
import kechImg from '../assets/kech.png';
// import SignUp from './SignUp';
// import Rating from './Rating';
// import AllTests from './AllTests';
// import WorkWindow from './WorkWindow';
// import Welcome from './Welcome';
=======
import AddTest from './AddTest';
import styles from './AdminPanel.module.css';
import kunImg from '../assets/kun.png';
import kechImg from '../assets/kech.png';
import SignUp from './SignUp';
import Rating from './Rating';
import AllTests from './AllTests';
>>>>>>> 6ee7490bdea6768f01e23a6572aa442685da4882

const AminPanel = () => {
   const [changeBgrounds, setChangeBgrounds] = useState(true);

   function changeBg() {
      if (changeBgrounds) {
         document.documentElement.style.setProperty(
            '--main-body-color',
            '#343434'
         );
         document.documentElement.style.setProperty(
            '--main-bg-color',
            '#434343'
         );
         document.documentElement.style.setProperty(
            '--dynamic-text-color',
            '#E9E5E2'
         );
         document.documentElement.style.setProperty(
            '--dynamic-inputs-color',
            '#6E6E6F'
         );
         document.documentElement.style.setProperty(
            '--dynamic-img',
            `url(${kunImg})`
         );
         setChangeBgrounds(false);
      } else {
         document.documentElement.style.setProperty(
            '--main-body-color',
            'white'
         );
         document.documentElement.style.setProperty(
            '--main-bg-color',
            'lightcyan'
         );
         document.documentElement.style.setProperty(
            '--dynamic-text-color',
            'black'
         );
         document.documentElement.style.setProperty(
            '--dynamic-inputs-color',
            'white'
         );
         document.documentElement.style.setProperty(
            '--dynamic-img',
            `url(${kechImg})`
         );
         setChangeBgrounds(true);
      }
   }

   return (
      <div>
         <header className={styles.headerWindow}>
            <h1>ADMINSTRATOR BO`LIMI</h1>
            <button
               onClick={changeBg}
               className={styles.dayNightButton}
            ></button>
         </header>
         <div className={styles.adminPanel}>
            <div className={styles.adminBlock}>
<<<<<<< HEAD
               {/* <AddTest />
               <SignUp />
               <AllTests /> */}
            </div>

            {/* <Rating /> */}
=======
               <AddTest />
               <SignUp />
               <AllTests />
            </div>

            <Rating />
>>>>>>> 6ee7490bdea6768f01e23a6572aa442685da4882
         </div>
      </div>
   );
};

export default AminPanel;
