import { useGetSumIncomesByMonth } from '../../hooks/useQueries/incomes';
import { useGetPlanificationByMonth } from '../../hooks/useQueries/planifications';
import { convertPercToNum } from '../../utils';
import { ITableProps } from '../../types';
import styles from './planificationTable.module.scss'

export default function PlanificationTable({
  monthId,
}: ITableProps){
  const sumIncomesByMonth = useGetSumIncomesByMonth(monthId)
  const planificationByMonth = useGetPlanificationByMonth(monthId)

  return (
    <table className={styles.container}>
      <thead>
        <tr>
          <th>Libellé</th>
          <th>Pourcentage</th>
          <th>Montant</th>
        </tr>
      </thead>
      <tbody>
        {
          sumIncomesByMonth.data && planificationByMonth.data
          ? <>
          <tr>
            <td>Charges fixes</td>
            <td>{planificationByMonth.data?.fixedExpenses} %</td>
            <td>{convertPercToNum(sumIncomesByMonth.data?.totalAmount, planificationByMonth.data?.fixedExpenses)} €</td>
          </tr>
          <tr>
            <td>Charges variables</td>
            <td>{planificationByMonth.data?.variableExpenses} %</td>
            <td>{convertPercToNum(sumIncomesByMonth.data?.totalAmount, planificationByMonth.data?.variableExpenses)} €</td>
          </tr>
          <tr>
            <td>Dépenses exceptionnelles</td>
            <td>{planificationByMonth.data?.exceptionalExpenses} %</td>
            <td>{convertPercToNum(sumIncomesByMonth.data?.totalAmount, planificationByMonth.data?.exceptionalExpenses)} €</td>
          </tr>
          <tr>
            <td>Loisirs</td>
            <td>{planificationByMonth.data?.hobbies} %</td>
            <td>{convertPercToNum(sumIncomesByMonth.data?.totalAmount, planificationByMonth.data?.hobbies)} €</td>
          </tr>
          <tr>
            <td>Epargne</td>
            <td>{planificationByMonth.data?.remainder} %</td>
            <td>{convertPercToNum(sumIncomesByMonth.data?.totalAmount, planificationByMonth.data?.remainder)} €</td>
          </tr>
          </>
          : <>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </>
        }
      </tbody>
      {/* <tfoot>
        <tr>
          <th>TOTAL</th>
          <td></td>
          <td></td>
        </tr>
      </tfoot> */}
    </table>
  );
}