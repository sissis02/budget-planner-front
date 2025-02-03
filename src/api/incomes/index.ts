import axios from 'axios'

const getIncomes = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/incomes/`,
  );
  return data.incomes;
};

const getIncomesByMonth = async (monthId: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/incomes/by-month/${monthId}`,
  );
  return data.incomesByMonth;
};

const getSumIncomesByMonth = async (monthId: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/incomes/sum-by-month/${monthId}`,
  );
  return data.sumIncomesByMonth[0];
};

const getAllSumIncomesByYear = async (year: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/incomes/sums-by-year/${year}`,
  );
  return data.sumsIncomesByYear;
};

const getIncome = async (_id: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/incomes/${_id}`,
  );
  return data.income;
};

const createIncome = async (data: {title: string, date: string, amount: number, month: string}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API_URL}/incomes/`,
    data,
  );
  return response.data;
};

const updateIncome = async (data: {_id: string,
  updatedData: {title: string, date: string, amount: number, month: string}}) => {
  const response = await axios.put(
    `${import.meta.env.VITE_REACT_APP_API_URL}/incomes/${data._id}`,
    data.updatedData,
  );
  return response.data;
};

const deleteIncome = async (_id: string) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_REACT_APP_API_URL}/incomes/${_id}`,
  );
  return response.data;
};

export {
  getIncomes,
  getIncomesByMonth,
  getSumIncomesByMonth,
  getAllSumIncomesByYear,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
};

