import { useState } from 'react';
import { useGetIncomesByMonth, useGetSumIncomesByMonth } from '../../hooks/useQueries/incomes';
import ModalToUpdateIncome from '../modals/ModalToUpdateIncome';
import ModalToDeleteIncome from '../modals/ModalToDeleteIncome';
import { convertToLocalDate } from '../../utils';
import { ITableProps } from '../../types';
import { IIncome } from '../../types/income.types';
import styles from './incomesTable.module.scss'

export default function IncomesTable({
  monthId,
}: ITableProps){
  const incomesByMonth = useGetIncomesByMonth(monthId);
  const sumIncomesByMonth = useGetSumIncomesByMonth(monthId)

  const [modalToUpdate, setModalToUpdate] = useState<boolean>(false)
  const [modalToDelete, setModalToDelete] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<null | string>(null)

  const handleModalToUpdate = (_id: string) => {
    setSelectedId(_id);
    setTimeout(() => {
      setModalToUpdate((current) => !current);
    }, 100);
  };

  const handleModalToDelete = (_id: string) => {
    setSelectedId(_id);
    setTimeout(() => {
      setModalToDelete((current) => !current);
    }, 100);
  };

  return (
    <>
      <table className={styles.container}>
        <thead>
          <tr>
            <th>Source</th>
            <th>Date</th>
            <th>Montant</th>
          </tr>
        </thead>
        {incomesByMonth.data?.length !== 0 
          ? <><tbody>
            {incomesByMonth.data?.map((income: IIncome) => (
              <tr key={income._id}>
                <td>{income.title}</td>
                <td>{convertToLocalDate(income.date)}</td>
                <td>{income.amount} €</td>
                <td className={styles.actionsContainer}>
                  <p onClick={() => handleModalToUpdate(income._id)}>Modifier le revenu</p>
                  <p onClick={() => handleModalToDelete(income._id)}>Supprimer le revenu</p>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>TOTAL</th>
              <th></th>
              <th>{incomesByMonth.data?.length !== 0 && sumIncomesByMonth.data?.totalAmount} €</th>
            </tr>
          </tfoot></>
          : <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
          </tbody>
        }
      </table>
      {
        modalToUpdate && selectedId && <ModalToUpdateIncome handleFunction={handleModalToUpdate} setFunction={setModalToUpdate} monthId={monthId} selectedId={selectedId}/>
      }
      {
        modalToDelete && selectedId && <ModalToDeleteIncome handleFunction={handleModalToDelete} setFunction={setModalToDelete} monthId={monthId} selectedId={selectedId}/>
      }
    </>
  );
}