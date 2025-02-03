export interface IMonthNavProps {
  month: string,
  selectedId: string,
}

export interface IYearNavProps {
  year: string,
}

export interface ITableProps {
  monthId: string,
}

export interface ISumsByYearProps {
  name: string,
  totalAmount: number,
}

export interface IRemaindersByYearProps {
  name: string,
  remainder: number,
  revenus: number,
  depenses: number,
}

