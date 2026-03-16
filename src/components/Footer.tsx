import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <span className={styles.copy}>
            &copy; {new Date().getFullYear()} Sebastian Barrio Bejarano
          </span>
          <span className={styles.sep} />
          <span className={styles.note}>
            Designed & built with precision and passion
          </span>
        </div>
      </div>
    </footer>
  )
}
