import { PieChart, Pie, Tooltip } from 'recharts'
import { useGetPlanificationByMonth } from '../../../hooks/useQueries/planifications';
import { useGetSumIncomesByMonth } from '../../../hooks/useQueries/incomes';

export default function TwoSimplePieChart({monthId}: {monthId: string}) {
  const planificationByMonth = useGetPlanificationByMonth(monthId)
  const sumIncomesByMonth = useGetSumIncomesByMonth(monthId)

  const data01 = [
    { name: 'Charges fixes', value: planificationByMonth.data && sumIncomesByMonth.data?.totalAmount * (planificationByMonth.data?.fixedExpenses/100) },
    { name: 'Charges variables', value: planificationByMonth.data && sumIncomesByMonth.data?.totalAmount * (planificationByMonth.data?.variableExpenses/100) },
    { name: 'Dépenses exceptionnelles', value: planificationByMonth.data && sumIncomesByMonth.data?.totalAmount * (planificationByMonth.data?.exceptionalExpenses/100) },
    { name: 'Loisirs', value: planificationByMonth.data && sumIncomesByMonth.data?.totalAmount * (planificationByMonth.data?.hobbies/100) },
    { name: 'Epargne', value: planificationByMonth.data && sumIncomesByMonth.data?.totalAmount * (planificationByMonth.data?.remainder/100) },
  ];
  
  const data02 = [
    { name: 'Charges fixes', value: 2400 },
    { name: 'Charges variables', value: 4567 },
    { name: 'Dépenses exceptionnelles', value: 1398 },
    { name: 'Loisirs', value: 9800 },
    { name: 'Epargne', value: 3908 },
  ];
  return (
    <PieChart width={700} height={520}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data01}
        cx={250}
        cy={300}
        outerRadius={180}
        fill="#D4C4CD"
        label
      />
      <Pie
        dataKey="value"
        data={data02}
        cx={450}
        cy={200}
        innerRadius={120}
        outerRadius={170}
        fill="#BB2649"
        label
        />
      <Tooltip />
    </PieChart>
  );
}