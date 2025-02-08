<<<<<<< HEAD
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
    const [selectedAnswers, setSelectedAnswers] = useState([]); // Har bir savol uchun tanlangan javob
    const [score, setScore] = useState(0);

    useEffect(() => {
        onValue(dataRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const foundTest = Object.keys(data).find(testId => testId === id);
                if (foundTest && data[foundTest].testlar) {
                    const parsedTest = JSON.parse(data[foundTest].testlar);
                    setTest(parsedTest);
                    setChecked(new Array(parsedTest[1].length).fill(true)); // Har bir savol uchun true
                    setSelectedAnswers(new Array(parsedTest[1].length).fill(null)); // Bosilmagan holatda null
                } else {
                    setTest("not-found");
                }
            } else {
                setTest("not-found");
            }
        });
    }, [id]);

    function check(index, answer, correctAnswer) {
        if (!checked[index]) return; // Agar savol allaqachon tanlangan bo'lsa, boshqa variant bosolmaydi

        const formattedAnswer = answer.trim().toLowerCase().replace(/\s+/g, " ").replace(/’/g, "'").replace(/[.,!?]+$/, "").normalize("NFKD");
        const formattedCorrectAnswer = correctAnswer.trim().toLowerCase().replace(/\s+/g, " ").replace(/’/g, "'").replace(/[.,!?]+$/, "").normalize("NFKD");

        let isCorrect = formattedAnswer === formattedCorrectAnswer;

        if (isCorrect) {
            // alert("To'g'ri javob!");
            setScore(prevScore => prevScore + 1);
        } else {
            // alert("Xato javob!");
        }

        setChecked(prevChecked => {
            const newChecked = [...prevChecked];
            newChecked[index] = false; // Faqat ushbu savolni bloklaymiz
            return newChecked;
        });

        setSelectedAnswers(prevSelected => {
            const newSelected = [...prevSelected];
            newSelected[index] = { answer, isCorrect }; // Tanlangan javobni va uning to'g'riligini saqlaymiz
            return newSelected;
        });
    }
    function allCheck() {
        if (score == test[1].length && alert("Test tugallandi!") === undefined) {
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
=======
import { useState } from 'react';
import testsData from './data';
import styles from './WorkWindow.module.css'

function WorkWindow() {
    const [testName] = useState(testsData[0]);
    const [questions] = useState(testsData[1]);

    function check(answer, correctAnswer) {
        if (answer === correctAnswer) {
            alert("To'g'ri");
        } else {
            alert("Xato");
        }
>>>>>>> 6ee7490bdea6768f01e23a6572aa442685da4882
    }

    return (
        <div className={styles.container}>
<<<<<<< HEAD
            <div className={styles.header}>
                <button onClick={back} style={{ cursor: 'pointer' }}>Qaytish</button>
                <p>Jami:{selectedAnswers.length + '/' + score} to`g`ri</p>
                <p>ball:{score}</p>
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
                <button onClick={allCheck}>Tugatish</button>
=======
            <h1>{testName}</h1>
            <ol>
                {questions.map((question, index) => (
                    <li key={index}>
                        <p>{question.savol}</p>
                        <ul>
                            <li onClick={() => check(question.a, question.javob)}>{question.a}</li>
                            <li onClick={() => check(question.b, question.javob)}>{question.b}</li>
                            <li onClick={() => check(question.c, question.javob)}>{question.c}</li>
                        </ul>
                    </li>
                ))}
>>>>>>> 6ee7490bdea6768f01e23a6572aa442685da4882
            </ol>
        </div>
    );
}

<<<<<<< HEAD

export default WorkWindow;
=======
export default WorkWindow;
>>>>>>> 6ee7490bdea6768f01e23a6572aa442685da4882
