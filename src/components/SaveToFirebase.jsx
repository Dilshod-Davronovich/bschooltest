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
      let imageRef = ref(storage, `Pupils/${phoneNumber}`);
      const snapshot = await uploadBytesResumable(imageRef, rasm);
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
