import * as mammoth from 'mammoth';
import { useState } from 'react';
import styles from './WordToObj.module.css';

const WordDragAndDrop = () => {
   const [textContent, setTextContent] = useState('');
   const [error, setError] = useState('');

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
               setTextContent(result.value); // Word fayldan olingan matn.
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
            className={styles.dragWindow}
         >
            Word faylini bu yerga tashlang.
         </div>
         {error && <p className={styles.errorWindow}>{error}</p>}
      </div>
   );
};

export default WordDragAndDrop;
