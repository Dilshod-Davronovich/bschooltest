import { useState } from "react";
import users from "./Users";
import styles from './Rating.module.css'


const Rating = () => {
  const [info] = useState(users[0]);
  console.log(info);
  function handleTop() {
    info.ball
  }
  return (
    <div className={styles.container}>
      <ol>
        {users.map((users, index) => (
          <li key={index}>
            <ul>
              <img src={users.img} style={{width:'100px', height:'100px'}}/>
            </ul>
            <ul>
              <li>{users.name}</li>
              <li>{users.ball}</li>
              <li>{users.tell}</li>
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Rating;