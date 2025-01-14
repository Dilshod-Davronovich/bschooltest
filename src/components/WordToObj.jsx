import * as mammoth from 'mammoth';
import { useState } from 'react';

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
         setError('Please drop a valid .docx file');
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
         <h1>Drag and Drop Word File</h1>
         <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
               border: '2px dashed #ccc',
               borderRadius: '10px',
               padding: '20px',
               textAlign: 'center',
               margin: '20px 0',
               backgroundColor: '#f9f9f9',
            }}
         >
            Drag and drop your .docx file here
         </div>
         {error && <p style={{ color: 'red' }}>{error}</p>}
         <textarea
            value={textContent}
            readOnly
            rows="15"
            style={{ width: '100%', border: '1px solid #ddd', padding: '10px' }}
         />
      </div>
   );
};

export default WordDragAndDrop;
