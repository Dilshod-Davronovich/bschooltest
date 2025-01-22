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
              <li>
                <img
                  src={user.img}
                  alt={`${user.name} rasmi`}
                  style={{ width: '120px', height: '120px' }}
                />
              </li>
              <li className={styles.fontStyle} style={{ color: "#ffa500" }}>
                {user.name}
              </li>
            </ul>
            <ul>
              <li className={styles.fontStyle} style={{ color: "#0099ff" }}>
                {user.group}
              </li>
              <li className={styles.fontStyle}>
                <a href={user.site} target="_blank" style={{ color: "#9999ff" }}>Sayt</a>
              </li>
              <li className={styles.fontStyle}>
                <a href={user.telegram} target="_blank" style={{ color: "#0099" }}>Telegram</a>
              </li>
              <li className={styles.fontStyle} style={{ color: "#FF2600" }}>
                {user.tell}
              </li>
            </ul>
            <div className={styles.progress} style={{
              "--i":`${user.ball}`,
              "--clr": user.ball < 50 ? "red" : user.ball < 75 ? "orange" : "#43f94a"
            }}>
              <h3>{user.ball}<span>%</span></h3>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Rating;
