import { NavLink } from 'react-router-dom'
import { IYearNavProps } from '../../types';
import styles from './yearNav.module.scss'
import logo from '/logo_budget_planner.png'

export default function YearNav({year}: IYearNavProps) {
  return (
    <header className={styles.container}>
      <div>
        <img src={logo} alt="logo de l'application de budget planner" />
        <h1>{year}</h1>
      </div>
      <NavLink to={'/'}>Retour au dashboard</NavLink>
    </header>
  );
}