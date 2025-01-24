import {
   getStorage,
   ref,
   uploadBytesResumable,
   getDownloadURL,
} from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export function saveImageToFirebase(rasm, phoneNumber) {
   let imageRef = ref(storage, `Pupils/${phoneNumber}`);
   console.log(rasm);
   uploadBytesResumable(imageRef, rasm) // bu metod yordamida fayl storagega yuklanadi.Unga manzil va fayl kerak.
      .then((snapshot) => {
         //then muvaffaqiyatli yuklanganda ishga tushadi.O'zi bilan snapshot obyektini olib keladi

         console.log('Yuklandi', snapshot.totalBytes, 'bytes.');
         console.log('File metadata:', snapshot.metadata);
         // Let's get a download URL for the file.
         getDownloadURL(snapshot.ref).then((url) => {
            console.log('Rasm ushbu manzilga yuklandi: ', url);
            return url;
         });
      })
      .catch((error) => {
         console.error('Upload failed', error);
         // ...
      });
}
