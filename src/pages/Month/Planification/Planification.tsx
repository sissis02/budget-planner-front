import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSumIncomesByMonth } from '../../../hooks/useQueries/incomes';
import { useGetPlanificationByMonth } from '../../../hooks/useQueries/planifications';
import PlanificationTable from '../../../components/PlanificationTable';
import ActiveShapePieChart from '../../../lib/charts/ActiveShapePieChart';
import ModalToUpdatePlanification from '../../../components/modals/ModalToUpdatePlanification';
import ModalToAddPlanification from '../../../components/modals/ModalToAddPlanification';
import styles from './planification.module.scss'

export default function Planification() {
  const { id } = useParams()
  const sumIncomesByMonth = useGetSumIncomesByMonth(id!)
  const planificationByMonth = useGetPlanificationByMonth(id!)
  const [modalToAddPlanification, setModalToAddPlanification] = useState<boolean>(false)
  const [modalToUpdatePlanification, setModalToUpdatePlanification] = useState<boolean>(false)

  const handleModalToAddPlanification = () => {
    setTimeout(() => {
      setModalToAddPlanification((current) => !current);
    }, 100);
  };

  const handleModalToUpdatePlanification = () => {
    setTimeout(() => {
      setModalToUpdatePlanification((current) => !current);
    }, 100);
  };
    
  return (
    <>
      <main className={styles.main}>
        <div className={styles.space}></div>
        <div className={styles.space2}></div>
        <div className={styles.content}>
          <h2>Planification</h2>
          <section>
            <div className={styles.top}>
              <h3>Base : {sumIncomesByMonth.data?.totalAmount} €</h3>
              {planificationByMonth.data === undefined
                ? <button onClick={handleModalToAddPlanification}>NOUVEAU</button>
                : <button onClick={handleModalToUpdatePlanification}>MODIFIER</button>
              }
            </div>
            {
              id && <PlanificationTable monthId={id}/>
            }
          </section>
          <section>
            {
              id && <ActiveShapePieChart monthId={id}/>
            }
          </section>
        </div>
      </main>
      {
        modalToAddPlanification && id && <ModalToAddPlanification handleFunction={handleModalToAddPlanification} setFunction={setModalToAddPlanification} monthId={id}/>
      }
      {
        modalToUpdatePlanification && id && <ModalToUpdatePlanification handleFunction={handleModalToUpdatePlanification} setFunction={setModalToUpdatePlanification} monthId={id}/>
      }
    </>
  );
}