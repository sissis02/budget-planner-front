import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ExpenseTraclinkgTable from '../../../components/ExpenseTrackingTable';
import ModalToAddExpense from '../../../components/modals/ModalToAddExpense';
import styles from './expenseTracking.module.scss'
import { useGetSumIncomesByMonth } from '../../../hooks/useQueries/incomes';
import { useGetPlanificationByMonth } from '../../../hooks/useQueries/planifications';

export default function ExpenseTracking() {
  const { id } = useParams()
  const sumIncomesByMonth = useGetSumIncomesByMonth(id!)
  const planification = useGetPlanificationByMonth(id!)

  const [modalToAddExpense, setModalToAddExpense] = useState<boolean>(false)

  const handleModalToAddExpense = () => {
    setTimeout(() => {
      setModalToAddExpense((current) => !current);
    }, 100);
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.space}></div>
        <div className={styles.content}>
          <h2>Historique des dépenses</h2>
          <section>
            <div className={styles.top}>
              <h3>Montant total prévu pour les dépenses : {sumIncomesByMonth.data && planification.data && sumIncomesByMonth.data?.totalAmount - (sumIncomesByMonth.data?.totalAmount * (planification.data?.remainder/100))} €</h3>
              <button onClick={handleModalToAddExpense}>NOUVEAU</button>
            </div>
            {id &&
            <ExpenseTraclinkgTable monthId={id} />
            }
          </section>
        </div>
      </main>
      {
        modalToAddExpense && id && <ModalToAddExpense handleFunction={handleModalToAddExpense} setFunction={setModalToAddExpense} monthId={id}/>
      }
    </>
  );
}