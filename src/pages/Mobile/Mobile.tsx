import Header from "../../components/Header"
import styles from './mobile.module.scss'

export default function Mobile() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <section>
          <h2>L'application n'est pas disponible pour cette device.</h2>
        </section>
      </main>
    </div>
  )
}