import styles from './Welcome.module.css';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const dataRef = ref(database, 'tests/');
  
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Router navigatsiya

  useEffect(() => {
    onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const question = Object.keys(data).map((id) => {
          const parsedTest = JSON.parse(data[id].testlar);
          return { id, ...parsedTest };
        });
        setTests(question);
      } else {
        console.log("Ma'lumot topilmadi.");
      }
    });
  }, []);

  const handleSearch = () => {
    const foundTest = tests.find(test => test.id === searchTerm);
    if (foundTest) {
      navigate(`/test/${searchTerm}`); // ID bo‘yicha WorkWindow sahifasiga o‘tkazamiz
    } else {
      alert("Bunday ID ga ega test topilmadi.");
    }
  };
  const handleBack = () => {
    navigate('/');
  }

  return (
    <>
      <button onClick={handleBack}>back</button>
      <header className={styles.header}>
        <h1>Welcome to BobobekovSchool!</h1>
      </header>
      <main className={styles.main}>
        <input 
          type="search" 
          className={styles.input} 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.button} onClick={handleSearch}>Search</button>
      </main>
    </>
  );
}

export default Welcome;