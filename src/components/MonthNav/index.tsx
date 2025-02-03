import { NavLink } from 'react-router-dom'
import { IMonthNavProps } from '../../types';
import styles from './monthNav.module.scss'
import logo from '/logo_budget_planner.png'

export default function MonthNav({month, selectedId}: IMonthNavProps) {
  return (
    <header className={styles.container}>
      <div>
        <img src={logo} alt="logo de l'application de budget planner" />
        <h1>{month}</h1>
      </div>
      <nav>
        <NavLink to={`/month/${selectedId}/initialData`} className={({isActive}) => isActive ? `${styles.active}` : ''}>Données initiales</NavLink>
        <NavLink to={`/month/${selectedId}/planification`} className={({isActive}) => isActive ? `${styles.active}` : ''}>Planification</NavLink>
        <NavLink to={`/month/${selectedId}/expenseTracking`} className={({isActive}) => isActive ? `${styles.active}` : ''}>Historique des dépenses</NavLink>
        <NavLink to={`/month/${selectedId}/budgetTracking`} className={({isActive}) => isActive ? `${styles.active}` : ''}>Suivi du budget</NavLink>
      </nav>
      <NavLink to={'/'}>Retour au dashboard</NavLink>
    </header>
  );
}