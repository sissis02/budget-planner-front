import { useState } from 'react';
import { useParams } from 'react-router-dom';
import IncomesTable from '../../../components/IncomesTable';
import FixedExpensesTable from '../../../components/FixedExpensesTable';
import ModalToAddIncome from '../../../components/modals/ModalToAddIncome';
import ModalToAddFixedExpense from '../../../components/modals/ModalToAddFixedExpense';
import styles from './initialData.module.scss'

export default function InitialData() {
  const { id } = useParams()

  const [modalToAddIncome, setModalToAddIncome] = useState<boolean>(false)
  const [modalToAddExpense, setModalToAddExpense] = useState<boolean>(false)

  const handleModalToAddIncome = () => {
    setTimeout(() => {
      setModalToAddIncome((current) => !current);
    }, 100);
  };

  const handleModalToAddExpense = () => {
    setTimeout(() => {
      setModalToAddExpense((current) => !current);
    }, 100);
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.space}></div>
        <div className={styles.space2}></div>
        <div className={styles.space3}></div>
        <div className={styles.content}>
          <h2>Données initiales</h2>
          <section>
            <div className={styles.top}>
              <h3>Revenus</h3>
              <button onClick={handleModalToAddIncome}>NOUVEAU</button>
            </div>
            {id &&
              <IncomesTable monthId={id}/>
            }
          </section>
          <section>
            <div className={styles.top}>
              <h3>Charges fixes</h3>
              <button onClick={handleModalToAddExpense}>NOUVEAU</button>
            </div>
            {id &&
              <FixedExpensesTable monthId={id}/>
            }
          </section>
        </div>
      </main>
      {
        modalToAddIncome && id && <ModalToAddIncome handleFunction={handleModalToAddIncome} setFunction={setModalToAddIncome} monthId={id}/>
      }
      {
        modalToAddExpense && id && <ModalToAddFixedExpense handleFunction={handleModalToAddExpense} setFunction={setModalToAddExpense} monthId={id}/>
      }
  </>
  );
}