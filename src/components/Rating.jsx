import users from "./Users";
import styles from './Rating.module.css';

const Rating = () => {
    const sortedUsers = [...users].sort((a, b) => b.ball - a.ball);

    return (
        <div className={styles.container}>
            <ol>
                {sortedUsers.map((user, index) => (
                    <li key={index}>
                        <ul>
                            <img
                                src={user.img}
                                alt={`${user.name} rasmi`}
                                style={{ width: '100px', height: '100px' }}
                            />
                        </ul>
                        <ul>
                            <li className={styles.fontStyle} style={{ color: "#ffa500" }}>
                                {user.name}
                            </li>
                            <li className={styles.fontStyle} style={{ color: "#0099ff" }}>
                                {user.ball} <>ball</>
                            </li>
                            <li className={styles.fontStyle} style={{ color: "#FF2600" }}>
                                {user.tell}
                            </li>
                        </ul>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Rating;
