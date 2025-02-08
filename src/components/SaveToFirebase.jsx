import { getDatabase, ref as refdb, set, get, child } from 'firebase/database';
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
const database = getDatabase(app);
const dbref = refdb(database);

export async function saveImageToFirebase(rasm, phoneNumber) {
   try {
      let cleanedNumber = phoneNumber.replace('+', '');
      let imageRef = ref(storage, `Pupils/${cleanedNumber}`);
      const metadata = {
         contentType: rasm.type || 'image/jpeg', // Faylning MIME turini ko'rsatish
      };
      const snapshot = await uploadBytesResumable(imageRef, rasm, metadata);
      const url = await getDownloadURL(snapshot.ref);
      return url;
   } catch (error) {
      console.error('Upload failed', error);
      throw error;
   }
}

export async function saveUserToUserListFirebase(
   givenName,
   familyName,
   phoneNumber,
   passwordNum,
   telegramName,
   groupName,
   siteName,
   url
) {
   let Users = [];
   get(child(dbref, 'Users/list')).then((snapshot) => {
      console.log(snapshot);
      if (snapshot.exists()) {
         let users = snapshot.val();
         Users = JSON.parse(users);
         Users.push({
            name: givenName,
            surname: familyName,
            phone: phoneNumber,
            password: passwordNum,
            telegram: telegramName,
            group: groupName,
            site: siteName,
            image: url,
            ball: 0,
         });
         const result = JSON.stringify(Users);
         set(refdb(database, 'Users/'), { list: result });
      } else {
         Users.push({
            name: givenName,
            surname: familyName,
            phone: phoneNumber,
            password: passwordNum,
            telegram: telegramName,
            group: groupName,
            site: siteName,
            image: url,
            ball: 0,
         });
         const result = JSON.stringify(Users);
         set(refdb(database, 'Users/'), { list: result });
      }
   });
}
<<<<<<< HEAD



export async function getUsersFromFirebase() {
    const database = getDatabase(); // Firebase database-ni olish
    const dataRef = refdb(database, 'Users/list');

    try {
        const snapshot = await get(dataRef); // await ishlatamiz
        if (snapshot.exists()) {
            return snapshot.val(); // Ma'lumotni qaytarish
        } else {
            console.log("Ma'lumot topilmadi.");
            return null; // Agar ma'lumot bo'lmasa, null qaytaramiz
        }
    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
        return null;
    }
}

=======
>>>>>>> 6ee7490bdea6768f01e23a6572aa442685da4882
// saveUserToUserListFirebase(
//    'Botir',
//    'Tohirov',
//    '9948444',
//    '888',
//    'telegram',
//    'burgut',
//    'site',
//    'img'
// );
