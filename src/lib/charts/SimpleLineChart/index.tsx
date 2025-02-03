import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useGetAllSumIncomesByYear } from '../../../hooks/useQueries/incomes';
import { useGetAllSumExpensesByYear } from '../../../hooks/useQueries/expenses';
import { ISumsByYearProps } from '../../../types';

export default function SimpleLineChart({name}: {name: string}) {

  const sumsIncomesByYear = useGetAllSumIncomesByYear(name)
  const sumsExpensesByYear = useGetAllSumExpensesByYear(name)

  const data = sumsIncomesByYear.data?.map((sum: ISumsByYearProps) => (
    {
      name: sum.name.charAt(0).toUpperCase() + String(sum.name).slice(1),
      revenus: sum.totalAmount,
      depenses: sumsExpensesByYear.data?.find((obj: ISumsByYearProps) => obj.name === sum.name)?.totalAmount
    }
  ))
  return (
    <LineChart
      width={1024}
      height={500}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name'/>
      <YAxis unit=' €'/>
      <Tooltip />
      <Legend />
      <Line type='monotone' dataKey='revenus' name='Revenus' stroke='#82ca9d' unit=' €'/>
      <Line type='monotone' dataKey='depenses' name='Dépenses' stroke='#8884d8' unit=' €' activeDot={{ r: 8 }} />
    </LineChart>
  );
}
