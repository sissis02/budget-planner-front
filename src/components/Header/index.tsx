import styles from './header.module.scss'
import logo from '/logo_budget_planner.png'

export default function Header() {
  return (
    <header className={styles.container}>
      <img src={logo} alt="logo de l'application de budget planner" />
      <h1>Bienvenue sur ton budget planner !</h1>
    </header>
  )
}