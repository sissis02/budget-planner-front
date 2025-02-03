/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, SetStateAction } from 'react'
import { PieChart, Pie, Sector } from "recharts"
import { useGetSumIncomesByMonth } from '../../../hooks/useQueries/incomes';
import { useGetPlanificationByMonth } from '../../../hooks/useQueries/planifications';

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    // percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#BB2649'
        fontFamily='Alatsi'
      >{`${value.toFixed(2)} €`}</text>
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#D4C4CD'
        fontFamily='Alatsi'
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  );
};

export default function ActiveShapePieChart({monthId}: {monthId: string}) {
  const sumIncomesByMonth = useGetSumIncomesByMonth(monthId)
  const planificationByMonth = useGetPlanificationByMonth(monthId)

  const data = [
    { name: 'Charges fixes', value: sumIncomesByMonth.data?.totalAmount * (planificationByMonth.data?.fixedExpenses/100) },
    { name: 'Charges variables', value: sumIncomesByMonth.data?.totalAmount * (planificationByMonth.data?.variableExpenses/100) },
    { name: 'Dépenses exceptionnelles', value: sumIncomesByMonth.data?.totalAmount * (planificationByMonth.data?.exceptionalExpenses/100) },
    { name: 'Loisirs', value: sumIncomesByMonth.data?.totalAmount * (planificationByMonth.data?.hobbies/100) },
    { name: 'Epargne', value: sumIncomesByMonth.data?.totalAmount * (planificationByMonth.data?.remainder/100) },
  ]; 

  const [activeIndex, setActiveIndex] = useState(0);
      const onPieEnter = useCallback(
        (_: any, index: SetStateAction<number>) => {
          setActiveIndex(index);
        },
        [setActiveIndex]
      );
  return (
    <PieChart width={620} height={500}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={320}
        cy={200}
        innerRadius={120}
        outerRadius={180}
        fill="#BB2649"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
}