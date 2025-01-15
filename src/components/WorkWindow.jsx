import { useState } from 'react';
import testsData from './data';

function WorkWindow() {
    const [testName, setTestName] = useState(testsData[0]);
    const [question, setQuestion] = useState(testsData[1]);
    
    console.log(question);
    
    return (
        <>
            <h1>{testName}</h1>
        </>
    )
}

export default WorkWindow;