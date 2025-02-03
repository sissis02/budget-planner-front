// Year
export interface IModalToAddYearProps {
  handleFunction: () => void,
  setFunction: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface IModalToUpdateYearProps {
  handleFunction: (_id: string) => void,
  setFunction: React.Dispatch<React.SetStateAction<boolean>>,
  selectedId: string,
}

export interface IModalToDeleteYearProps {
  handleFunction: (_id: string) => void,
  setFunction: React.Dispatch<React.SetStateAction<boolean>>,
  selectedId: string,
}

// Month
export interface IModalToAddMonthProps {
  handleFunction: () => void,
  setFunction: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface IModalToUpdateMonthProps {
  handleFunction: (_id: string) => void,
  setFunction: React.Dispatch<React.SetStateAction<boolean>>,
  selectedId: string,
}

export interface IModalToDeleteMonthProps {
  handleFunction: (_id: string) => void,
  setFunction: React.Dispatch<React.SetStateAction<boolean>>,
  selectedId: string,
}

// Income
export interface IModalToAddIncomeProps {
  handleFunction: () => void,
  setFunction: React.Dispatch<React.SetStateAction<boolean>>,
  monthId: string,
}

export interface IModalToUpdateIncomeProps {
  handleFunction: (_id: string) => void,
  setFunction: React.Dispatch<React.SetStateAction<boolean>>,
  monthId: string,
  selectedId: string,
}

export interface IModalToDeleteIncomeProps {
  handleFunction: (_id: string) => void,
  setFunction: React.Dispatch<React.SetStateAction<boolean>>,
  monthId: string,
  selectedId: string,
}

// Expense
export interface IModalToAddExpenseProps {
  handleFunction: () => void,
  setFunction: React.Dispatch<React.SetStateAction<boolean>>,
  monthId: string,
}

export interface IModalToUpdateExpenseProps {
  handleFunction: (_id: string) => void,
  setFunction: React.Dispatch<React.SetStateAction<boolean>>,
  monthId: string,
  selectedId: string,
}

export interface IModalToDeleteExpenseProps {
  handleFunction: (_id: string) => void,
  setFunction: React.Dispatch<React.SetStateAction<boolean>>,
  monthId: string,
  selectedId: string,
}

// Planification
export interface IModalToAddPlanificationProps {
  handleFunction: () => void,
  setFunction: React.Dispatch<React.SetStateAction<boolean>>,
  monthId: string,
}

export interface IModalToUpdatePlanificationProps {
  handleFunction: (_id: string) => void,
  setFunction: React.Dispatch<React.SetStateAction<boolean>>,
  monthId: string,
}

