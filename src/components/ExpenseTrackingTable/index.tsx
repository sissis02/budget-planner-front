import { useState } from 'react';
import { useGetExpensesByMonth, useGetSumExpensesByMonth } from '../../hooks/useQueries/expenses';
import ModalToUpdateExpense from '../modals/ModalToUpdateExpense';
import ModalToDeleteExpense from '../modals/ModalToDeleteExpense';
import { convertToLocalDate } from '../../utils';
import { ITableProps } from '../../types';
import { IExpense } from '../../types/expense.types';
import styles from './expenseTrackingTable.module.scss'

export default function ExpenseTraclinkgTable({
  monthId,
}: ITableProps){
  const expensesByMonth = useGetExpensesByMonth(monthId)
  const sumExpensesByMonth = useGetSumExpensesByMonth(monthId)

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
            <th>Catégorie</th>
            <th>Date</th>
            <th>Montant</th>
          </tr>
        </thead>
        {expensesByMonth.data?.length !== 0
          ? <>
            <tbody>
            {expensesByMonth.data?.map((expense: IExpense) => (
              <tr key={expense._id}>
                <td>{expense.title}</td>
                <td>{expense.category}</td>
                <td>{convertToLocalDate(expense.date)}</td>
                <td>{expense.amount} €</td>
              {expense.category !== 'charges fixes' &&
                <td className={styles.actionsContainer}>
                  <p onClick={() => handleModalToUpdate(expense._id)}>Modifier la dépense</p>
                  <p onClick={() => handleModalToDelete(expense._id)}>Supprimer la dépense</p>
                </td>}
              </tr>
            ))}
            </tbody>
            <tfoot>
              <tr>
              <th>TOTAL</th>
              <th></th>
              <th></th>
              <th>{expensesByMonth.data?.length !== 0 && sumExpensesByMonth.data?.totalAmount} €</th>
            </tr>
          </tfoot></>
          : <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        }
      </table>
      {
        modalToUpdate && selectedId && <ModalToUpdateExpense handleFunction={handleModalToUpdate} setFunction={setModalToUpdate} monthId={monthId} selectedId={selectedId}/>
      }
      {
        modalToDelete && selectedId && <ModalToDeleteExpense handleFunction={handleModalToDelete} setFunction={setModalToDelete} monthId={monthId} selectedId={selectedId}/>
      }
    </>
  );
}