import AddTest from './AddTest';
import styles from './AdminPanel.module.css';

const AminPanel = () => {
   return (
      <div>
         <header className={styles.headerWindow}>
            <h1>ADMINSTRATOR BO'LIMI</h1>
         </header>
         <AddTest />
      </div>
   );
};

export default AminPanel;
