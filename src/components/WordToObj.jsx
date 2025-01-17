import * as mammoth from 'mammoth';
import { useState, useEffect } from 'react';
import styles from './WordToObj.module.css';
import wordgif from '../assets/word.gif';

const WordDragAndDrop = ({
   testObjectList,
   setTestObjectList,
   complated,
   setComplated,
}) => {
   const [textContent, setTextContent] = useState('');
   const [error, setError] = useState('');

   useEffect(() => {
      if (textContent !== '') {
         textToObjectJson(textContent);
         setComplated(true);
      }
   }, [textContent]);

   function textToObjectJson(text) {
      let questions = text.split('*');
      const updatedTestObjects = [...testObjectList];
      questions.forEach((question) => {
         let listQuestion = question.split('>');
         let yangilanganMatn = listQuestion.map((element) =>
            element.replace(/\n+/g, '')
         );
         let testObject = {
            savol: yangilanganMatn[0],
            a: yangilanganMatn[1],
            b: yangilanganMatn[2],
            c: yangilanganMatn[3],
            javob: yangilanganMatn[4],
         };
         updatedTestObjects.push(testObject);
      });
      setTestObjectList(updatedTestObjects);
      setTextContent('');
   }

   const handleDrop = (event) => {
      event.preventDefault(); // Brauzerning default xatti-harakatini to'xtatish (ochilishi).
      setError(''); // Xatolarni tozalash.

      const file = event.dataTransfer.files[0]; // Drag qilingan faylni olish.

      if (
         !file ||
         file.type !==
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
         setError('Iltimos .docx file tashlang');
         return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
         const arrayBuffer = e.target.result;

         mammoth
            .extractRawText({ arrayBuffer })
            .then((result) => {
               const extractedText = result.value;
               setTextContent(extractedText); // Word fayldan olingan matn.
            })
            .catch((err) => {
               setError('Error processing the file');
               console.error(err);
            });
      };

      reader.readAsArrayBuffer(file); // Faylni o'qish.
   };

   const handleDragOver = (event) => {
      event.preventDefault(); // Brauzerning default xatti-harakatini to'xtatish.
   };

   return (
      <div>
         <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={
               complated ? styles.dragWindowComplated : styles.dragWindow
            }
         >
            {complated ? (
               <img className={styles.imgWindow} src={wordgif} />
            ) : (
               'Word faylini bu yerga tashlang.'
            )}
         </div>
         {error && <p className={styles.errorWindow}>{error}</p>}
      </div>
   );
};

export default WordDragAndDrop;
