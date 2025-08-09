import styles from "./styles.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        © {new Date().getFullYear()} OWA. Все права защищены.
      </div>
    </footer>
  )
}

export default Footer
