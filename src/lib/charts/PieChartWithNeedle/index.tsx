/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell } from 'recharts'
import { useGetSumExpensesByMonth } from '../../../hooks/useQueries/expenses';
import { useGetPlanificationByMonth } from '../../../hooks/useQueries/planifications';
import { useGetSumIncomesByMonth } from '../../../hooks/useQueries/incomes';

const RADIAN = Math.PI / 180;
const cx = 200;
const cy =200;
const iR = 140;
const oR = 200;
// const value = 200;

const needle = (value: number, data: any[], cx: number, cy: number, iR: number, oR: number, color: string | undefined) => {
  let total = 0;
  data.forEach((v: { value: number; }) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
  ];
};

export default function PieChartWithNeedle({monthId}: {monthId: string}) {
  const sumExpensesByMonth = useGetSumExpensesByMonth(monthId)
  const planificationByMonth = useGetPlanificationByMonth(monthId)
  const sumIncomesByMonth = useGetSumIncomesByMonth(monthId)

  const value = sumExpensesByMonth.data?.totalAmount

  const data = [
    { name: 'Dépenses effectuées', value: planificationByMonth.data && sumIncomesByMonth.data?.totalAmount - (sumIncomesByMonth.data?.totalAmount * (planificationByMonth.data?.remainder/100)), color: '#FDE7E4' },
    { name: 'Solde', value: planificationByMonth.data && sumIncomesByMonth.data?.totalAmount * (planificationByMonth.data?.remainder/100), color: '#BB2649' },
  ];

  return (
    <PieChart width={450} height={220}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        fill="#8884d8"
        stroke="none"
        >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {needle(value, data, cx, cy, iR, oR, '#D4C4CD')}
    </PieChart>
  );
}
