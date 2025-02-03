import { useParams } from 'react-router-dom';
import PieChartWithNeedle from '../../../lib/charts/PieChartWithNeedle';
// import TwoSimplePieChart from '../../../lib/charts/TwoSimplePieChart';
import styles from './budgetTracking.module.scss'
import { useGetIncomesByMonth, useGetSumIncomesByMonth } from '../../../hooks/useQueries/incomes';

export default function BudgetTracking() {
  const { id } = useParams()
  const sumIncomesByMonth = useGetSumIncomesByMonth(id!)
  const incomesByMonth = useGetIncomesByMonth(id!)
  return (
    <>
      <main className={styles.main}>
        <h2>Suivi du budget</h2>
        <section>
          <h3>Total des revenus : {incomesByMonth.data?.length !== 0 && sumIncomesByMonth.data?.totalAmount} €</h3>
          <div className={styles.chart1}>
            {
              id && <PieChartWithNeedle monthId={id}/>
            }
            <div>
              <div className={styles.legend}>
                <div className={styles.circle}></div>
                <p>Dépenses planifiées</p>
              </div>
              <div className={styles.legend}>
                <div className={styles.circle2}></div>
                <p>Epargne planifiée</p>
              </div>
            </div>
          </div>
        </section>
        {/* <section>
          <h3>Comparaison entre la planification et la répartition actuelle</h3>
          {
            id && <TwoSimplePieChart monthId={id}/>
          }
          <p className={styles.gray}>Planification</p>
          <p>Répartition actuelle</p>
        </section> */}
      </main>
    </>
  );
}