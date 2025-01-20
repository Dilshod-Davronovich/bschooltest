import { useState } from 'react';
import styles from './Login.module.css';

function Login() {
    const [phoneNumber, setPhoneNumber] = useState('+998');
    const [passwordNum, setPasswordNum] = useState('');
    const [error, setError] = useState(false);

    // Telefon raqamini o'zgartirish
    function handlePhoneChange(e) {
        const input = e.target.value;
        if (/^\+998[0-9]*$/.test(input)) {
            setPhoneNumber(input);
        }
    };

    // Parolni o'zgartirish
    function handlePasswordChange(e) {
        setPasswordNum(e.target.value);
    };

    // Tekshiruv funksiyasi
    function handleCheck() {
        if (phoneNumber.length !== 13 || passwordNum === '') {
            setError(true);
            return;
        } else {
            setError(false);
            alert('Bunday login topilmadi!');
            setPasswordNum('');
            setPhoneNumber('+998');
        }
    };

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
