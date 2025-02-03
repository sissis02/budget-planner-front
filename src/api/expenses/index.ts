import axios from 'axios'

const getExpenses = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/expenses/`,
  );
  return data.expenses;
};

const getExpensesByMonth = async (monthId: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/expenses/by-month/${monthId}`,
  );
  return data.expensesByMonth;
};

const getFixedExpensesByMonth = async (monthId: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/expenses/fixed-expenses-by-month/${monthId}`,
  );
  return data.fixedExpensesByMonth;
};

const getSumExpensesByMonth = async (monthId: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/expenses/sum-by-month/${monthId}`,
  );
  return data.sumExpensesByMonth[0];
};

const getAllSumExpensesByYear = async (year: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/expenses/sums-by-year/${year}`,
  );
  return data.sumsExpensesByYear;
};

const getSumFixedExpensesByMonth = async (monthId: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/expenses/sum-fixed-expenses-by-month/${monthId}`,
  );
  return data.sumFixedExpensesByMonth[0];
};

const getExpense = async (_id: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/expenses/${_id}`,
  );
  return data.expense;
};

const createExpense = async (data: {title: string, category: string, date: string, amount: number, month: string}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API_URL}/expenses/`,
    data,
  );
  return response.data;
};

const updateExpense = async (data: {_id: string,
  updatedData: {title: string, category: string, date: string, amount: number, month: string}}) => {
  const response = await axios.put(
    `${import.meta.env.VITE_REACT_APP_API_URL}/expenses/${data._id}`,
    data.updatedData,
  );
  return response.data;
};

const deleteExpense = async (_id: string) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_REACT_APP_API_URL}/expenses/${_id}`,
  );
  return response.data;
};

export {
  getExpenses,
  getExpensesByMonth,
  getFixedExpensesByMonth,
  getSumExpensesByMonth,
  getAllSumExpensesByYear,
  getSumFixedExpensesByMonth,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};

