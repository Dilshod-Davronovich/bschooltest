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
    }

    return (
        <div className={styles.container}>
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
            </ol>
        </div>
    );
}

export default WorkWindow;
