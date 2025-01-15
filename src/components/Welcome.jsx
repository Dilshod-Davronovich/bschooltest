import styles from './Welcome.module.css'

function Welcome() {
  return (
    <>
        <header className={styles.header}>
            <h1>Welcome to BobobekovSchool!</h1>
        </header>
        <main className={styles.main}>
            <input type="search" className={styles.input} />
            <button className={styles.button}>Search</button>
        </main>
    </>
  )
}

export default Welcome;