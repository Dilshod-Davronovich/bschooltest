import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase';
import { useEffect, useState } from 'react';
import styles from './AllTests.module.css';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataRef = ref(database, 'tests/');

const AllTests = () => {
    const [tests, setTests] = useState([]);
    const [isListVisible, setIsListVisible] = useState(false);

    useEffect(() => {
        onValue(dataRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const allTests = Object.keys(data).map((id) => {
                    const parsedTest = JSON.parse(data[id].testlar);
                    return { id, title: parsedTest[0] };
                });
                setTests(allTests);
            } else {
                console.log('Ma\'lumot topilmadi.');
            }
        });
    }, []);

    function openClose() {
        setIsListVisible((prevState) => !prevState);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title} onClick={openClose}>Barcha Testlar</h1>
            <ul
                className={`${styles.list} ${
                    isListVisible ? styles.open : styles.closed
                }`}
            >
                {tests.map((test) => (
                    <li key={test.id} className={styles.listItem}>
                        <span className={styles.itemId}>ID: {test.id}</span>
                        <p className={styles.itemTitle}>{test.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllTests;
