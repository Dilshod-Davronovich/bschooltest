<<<<<<< HEAD
import { useState, useEffect } from 'react';
import styles from './Login.module.css';
import { getUsersFromFirebase } from './SaveToFirebase';
import { useNavigate } from 'react-router-dom';
=======
import { useState } from 'react';
import styles from './Login.module.css';
>>>>>>> 6ee7490bdea6768f01e23a6572aa442685da4882

function Login() {
    const [phoneNumber, setPhoneNumber] = useState('+998');
    const [passwordNum, setPasswordNum] = useState('');
    const [error, setError] = useState(false);
<<<<<<< HEAD
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // Router navigatsiya

    useEffect(() => {
        getUsersFromFirebase().then((data) => {
            let allUsers = JSON.parse(data);
            setUsers(allUsers);
        }).catch(error => {
            console.error("Firebase'dan ma'lumot olishda xatolik:", error);
        });
    }, []);


=======

    // Telefon raqamini o'zgartirish
>>>>>>> 6ee7490bdea6768f01e23a6572aa442685da4882
    function handlePhoneChange(e) {
        const input = e.target.value;
        if (/^\+998[0-9]*$/.test(input)) {
            setPhoneNumber(input);
        }
    };

<<<<<<< HEAD
=======
    // Parolni o'zgartirish
>>>>>>> 6ee7490bdea6768f01e23a6572aa442685da4882
    function handlePasswordChange(e) {
        setPasswordNum(e.target.value);
    };

<<<<<<< HEAD
    function handleCheck() {
        // console.log(users);
        // Telefon raqami va parolni tekshirish
        const foundUser = users.find(user => user.phone === phoneNumber && user.password === passwordNum);
        console.log(foundUser);

        if (foundUser) {
            setError(false);
            navigate('/welcome');
        } else {
            setError(true);
=======
    // Tekshiruv funksiyasi
    function handleCheck() {
        if (phoneNumber.length !== 13 || passwordNum === '') {
            setError(true);
            return;
        } else {
            setError(false);
>>>>>>> 6ee7490bdea6768f01e23a6572aa442685da4882
            alert('Bunday login topilmadi!');
            setPasswordNum('');
            setPhoneNumber('+998');
        }
    };

<<<<<<< HEAD


=======
>>>>>>> 6ee7490bdea6768f01e23a6572aa442685da4882
    return (
        <form className={styles.form}>
            <input
                type="tel"
                autoComplete="tel"
                onChange={handlePhoneChange}
                value={phoneNumber}
                placeholder="Telefon raqamingiz!"
                className={error && phoneNumber.length !== 13 ? styles.rrr : ''}
            />
            <input
                type="password"
                autoComplete="current-password"
                placeholder="Parolni kiriting!"
                value={passwordNum}
                onChange={handlePasswordChange}
                className={error && passwordNum === '' ? styles.rrr : ''}
            />
            <button type="button" onClick={handleCheck}>Login</button>
        </form>
    );
}

export default Login;
