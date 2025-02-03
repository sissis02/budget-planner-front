import { useState } from 'react';
import { useGetFixedExpensesByMonth, useGetSumFixedExpensesByMonth } from '../../hooks/useQueries/expenses';
import ModalToUpdateFixedExpense from '../modals/ModalToUpdateFixedExpense';
import ModalToDeleteExpense from '../modals/ModalToDeleteExpense';
import { convertToLocalDate } from '../../utils';
import { IExpense } from '../../types/expense.types';
import { ITableProps } from '../../types';
import styles from './fixedExpensesTable.module.scss'

export default function FixedExpensesTable({
  monthId,
}: ITableProps){
  const fixedExpensesByMonth = useGetFixedExpensesByMonth(monthId)
  const sumFixedExpensesByMonth = useGetSumFixedExpensesByMonth(monthId)

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
            <th>Libellé</th>
            <th>Date</th>
            <th>Montant</th>
          </tr>
        </thead>
        {fixedExpensesByMonth.data?.length !== 0
          ? <><tbody>
            {fixedExpensesByMonth.data?.map((expense: IExpense) => (
                <tr key={expense._id}>
                  <td>{expense.title}</td>
                  <td>{convertToLocalDate(expense.date)}</td>
                  <td>{expense.amount} €</td>
                  <td className={styles.actionsContainer}>
                    <p onClick={() => handleModalToUpdate(expense._id)}>Modifier la charge fixe</p>
                    <p onClick={() => handleModalToDelete(expense._id)}>Supprimer la charge fixe</p>
                  </td>
                </tr>
              ))}
            </tbody><tfoot>
              <tr>
                <th>TOTAL</th>
                <th></th>
                <th>{fixedExpensesByMonth.data?.length !== 0 && sumFixedExpensesByMonth.data?.totalAmount} €</th>
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
        modalToUpdate && selectedId && <ModalToUpdateFixedExpense handleFunction={handleModalToUpdate} setFunction={setModalToUpdate} monthId={monthId} selectedId={selectedId}/>
      }
      {
        modalToDelete && selectedId && <ModalToDeleteExpense handleFunction={handleModalToDelete} setFunction={setModalToDelete} monthId={monthId} selectedId={selectedId}/>
      }
    </>
  );
}