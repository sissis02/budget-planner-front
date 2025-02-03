import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useGetAllSumIncomesByYear } from '../../../hooks/useQueries/incomes';
import { useGetAllSumExpensesByYear } from '../../../hooks/useQueries/expenses';
import { IRemaindersByYearProps, ISumsByYearProps } from '../../../types';

export default function LineChartConnect({name}: {name: string}) {
  const sumsIncomesByYear = useGetAllSumIncomesByYear(name)
  const sumsExpensesByYear = useGetAllSumExpensesByYear(name)

    const dataToTransform = sumsIncomesByYear.data?.map((sum: ISumsByYearProps) => (
      {
        name: sum.name.charAt(0).toUpperCase() + String(sum.name).slice(1),
        revenus: sum.totalAmount,
        depenses: sumsExpensesByYear.data?.find((obj: ISumsByYearProps) => obj.name === sum.name)?.totalAmount
      }
    ))

    const data = dataToTransform?.map((obj: IRemaindersByYearProps) => (
      {
        name: obj.name,
        remainder: obj.revenus - obj.depenses,
      }
    ))

  return (
      <LineChart
        width={1024}
        height={500}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 0,
        }}
        >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis unit=' €'/>
        <Tooltip />
        <Line connectNulls type='monotone' dataKey='remainder' name='Epargne' stroke="#8884d8" fill="#8884d8" unit=' €'/>
      </LineChart>
  );
}
