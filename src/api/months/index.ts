import axios from 'axios'

const getMonths = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/months/`,
  );
  return data.months;
};

const getMonthsByYear = async (yearId: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/incomes/by-year/${yearId}`,
  );
  return data.monthsByMonth;
};

const getMonth = async (_id: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/months/${_id}`,
  );
  return data.month;
};

const createMonth = async (data: {name: string, year: string}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API_URL}/months/`,
    data,
  );
  return response.data;
};

const updateMonth = async (data: {_id: string, updatedData: {name: string, year: string}}) => {
  const response = await axios.put(
    `${import.meta.env.VITE_REACT_APP_API_URL}/months/${data._id}`,
    data.updatedData,
  );
  return response.data;
};

const deleteMonth = async (_id: string) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_REACT_APP_API_URL}/months/${_id}`,
  );
  return response.data;
};

export {
  getMonths,
  getMonthsByYear,
  getMonth,
  createMonth,
  updateMonth,
  deleteMonth,
};

