import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './WorkWindow.module.css';

function WorkWindow() {
    const { id } = useParams();
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const dataRef = ref(database, 'tests/');
    const navigate = useNavigate();

    const [test, setTest] = useState(null);
    const [checked, setChecked] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        onValue(dataRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const foundTest = Object.keys(data).find(testId => testId === id);
                if (foundTest && data[foundTest].testlar) {
                    const parsedTest = JSON.parse(data[foundTest].testlar);
                    setTest(parsedTest);
                    setChecked(new Array(parsedTest[1].length).fill(true));
                    setSelectedAnswers(new Array(parsedTest[1].length).fill(null));
                } else {
                    setTest("not-found");
                }
            } else {
                setTest("not-found");
            }
        });
    }, [id]);

    function check(index, answer, correctAnswer) {
        if (!checked[index]) return;

        const formattedAnswer = answer.trim().toLowerCase().replace(/\s+/g, " ").replace(/’/g, "'").replace(/[.,!?]+$/, "").normalize("NFKD");
        const formattedCorrectAnswer = correctAnswer.trim().toLowerCase().replace(/\s+/g, " ").replace(/’/g, "'").replace(/[.,!?]+$/, "").normalize("NFKD");

        let isCorrect = formattedAnswer === formattedCorrectAnswer;

        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
        }

        setChecked(prevChecked => {
            const newChecked = [...prevChecked];
            newChecked[index] = false;
            return newChecked;
        });

        setSelectedAnswers(prevSelected => {
            const newSelected = [...prevSelected];
            newSelected[index] = { answer, isCorrect };
            return newSelected;
        });
    }

    function allCheck() {
        if (score === test[1].length) {
            alert("Test tugallandi!");
            navigate("/welcome");
        } else {
            alert("Testni tugatish uchun barcha savollarga javob bering!");
        }
    }

    function back() {
        navigate("/welcome");
    }

    if (test === "not-found") {
        return <h2>Bunday test topilmadi!</h2>;
    }

    if (!test) {
        return <h2>Yuklanmoqda...</h2>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={back} style={{ cursor: 'pointer' }}>Qaytish</button>
                <p>Jami: {selectedAnswers.length}/{score} to`g`ri</p>
                <p>Ball: {score}</p>
            </div>
            <h1>{test[0]}</h1>
            <ol>
                {test[1]?.map((savol, index) => (
                    <li key={index}>
                        <p>Savol: {savol.savol}</p>
                        <ul>
                            {["a", "b", "c"].map((option) => (
                                <li
                                    key={option}
                                    onClick={() => check(index, savol[option], savol.javob)}
                                    style={{
                                        pointerEvents: checked[index] ? "auto" : "none",
                                        opacity: checked[index] ? 1 : 0.5,
                                        backgroundColor: selectedAnswers[index]?.answer === savol[option]
                                            ? (selectedAnswers[index]?.isCorrect ? '#6cd80d' : '#ff4d4d')
                                            : '#e6f7ff'
                                    }}
                                >
                                    {option.toUpperCase()}) {savol[option]}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
            <button onClick={allCheck}>Tugatish</button>
        </div>
    );
}

export default WorkWindow;
