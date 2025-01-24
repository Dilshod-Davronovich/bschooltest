import { useState } from 'react';
import styles from './AdminPanel.module.css';
import { saveImageToFirebase } from './SaveToFirebase';

const SignUp = () => {
   const [phoneNumber, setPhoneNumber] = useState('+998');
   const [telegramName, setTelegramName] = useState('t.me/+998');
   const [passwordNum, setPasswordNum] = useState('');
   const [givenName, setGivenName] = useState('');
   const [familyName, setFamilyName] = useState('');
   const [groupName, setGroupName] = useState('');
   const [siteName, setSiteName] = useState('');
   const [image, setImage] = useState('');
   const [img, setImg] = useState(null);
   const [error, setError] = useState('');

   const [openWindow, setOpenWindow] = useState(true);
   const [checkFirst, setCheckFirst] = useState(false);

   function handlePhoneChange(e) {
      const input = e.target.value;
      if (/^\+998[0-9]*$/.test(input)) {
         setPhoneNumber(input);
      }
   }
   function handleTelegramChange(e) {
      const input = e.target.value;
      if (input) {
         setTelegramName(input);
      }
   }

   function handlePasswordChange(e) {
      setPasswordNum(e.target.value);
   }

   function handleNameChange(e) {
      setGivenName(e.target.value);
   }

   function handleFamilyChange(e) {
      setFamilyName(e.target.value);
   }
   function handleGroupChange(e) {
      setGroupName(e.target.value);
   }
   function handleSiteChange(e) {
      setSiteName(e.target.value);
   }

   function handleImageChange(e) {
      const file = e.target.files[0];
      if (file) {
         setImage(file.name);
         setImg(file);
      }
   }

   function handleCheck(e) {
      e.preventDefault();
      if (
         passwordNum === '' ||
         givenName === '' ||
         familyName === '' ||
         phoneNumber.length !== 13 ||
         !image
      ) {
         setError(true);
         return;
      }
      setError(false);
      setPasswordNum('');
      setPhoneNumber('+998');
      setGivenName('');
      setFamilyName('');
      setImage(null);
      alert('Muvaffaqiyatli ro‘yxatdan o‘tildi!');
   }

   function handleButtonClick() {
      document.getElementById('fileInput').click();
   }

   function saveImage() {
      saveImageToFirebase(img, phoneNumber);
   }

   return (
      <div
         id={styles.SignUp}
         className={
            !checkFirst
               ? `${styles.adminWindow}`
               : `${styles.adminWindow} ${
                    openWindow ? styles.closeWindow : styles.openWindow
                 }`
         }
      >
         <button
            className={
               !checkFirst
                  ? `${styles.openBtn}`
                  : `${styles.openBtn} ${
                       openWindow ? styles.closeRotateBtn : styles.openRotateBtn
                    }`
            }
            onClick={() => {
               setOpenWindow(!openWindow);
               if (!checkFirst) {
                  setCheckFirst(true);
               }
            }}
         ></button>
         <h1
            onClick={() => {
               setOpenWindow(!openWindow);
               if (!checkFirst) {
                  setCheckFirst(true);
               }
            }}
         >
            O`quvchi qo`shish
         </h1>

         <form className={styles.form} onSubmit={handleCheck}>
            <input
               type="text"
               value={givenName}
               autoComplete="given-name"
               placeholder="Ism"
               onChange={handleNameChange}
               className={error && givenName === '' ? styles.rrr : ''}
            />
            <input
               type="text"
               autoComplete="family-name"
               placeholder="Familiya"
               onChange={handleFamilyChange}
               value={familyName}
               className={error && familyName === '' ? styles.rrr : ''}
            />
            <input
               type="text"
               autoComplete="family-group"
               placeholder="Guruh nomi!"
               onChange={handleGroupChange}
               value={groupName}
               className={error && groupName === '' ? styles.rrr : ''}
            />
            <input
               type="text"
               autoComplete="family-telegram"
               placeholder="Telegram"
               onChange={handleTelegramChange}
               value={telegramName}
               className={error && telegramName === '' ? styles.rrr : ''}
            />
            <input
               type="text"
               autoComplete="family-site"
               placeholder="Site manzili"
               onChange={handleSiteChange}
               value={siteName}
            />
            <input
               type="password"
               autoComplete="current-password"
               value={passwordNum}
               onChange={handlePasswordChange}
               className={error && passwordNum === '' ? styles.rrr : ''}
               placeholder="Parol"
            />
            <input
               type="tel"
               autoComplete="tel"
               placeholder="Telefon raqamingiz"
               onChange={handlePhoneChange}
               className={error && phoneNumber.length !== 13 ? styles.rrr : ''}
               value={phoneNumber}
            />
            <button type="button" onClick={handleButtonClick}>
               {image ? `Rams tanladi: ${image}` : 'Rasm tanlanmagan!'}
            </button>
            <input
               type="file"
               id="fileInput"
               accept="image/*"
               onChange={handleImageChange}
               style={{ display: 'none' }}
            />
            <button onClick={saveImage}>Ro‘yxatga qo‘shish.</button>
         </form>
      </div>
   );
};

export default SignUp;
