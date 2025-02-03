import axios from 'axios'

const getPlanifications = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/planifications/`,
  );
  return data.planifications;
};

const getPlanificationByMonth = async (monthId: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/planifications/by-month/${monthId}`,
  );
  return data.planificationByMonth[0];
};

const getPlanification = async (_id: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/planifications/${_id}`,
  );
  return data.planification;
};

const createPlanification = async (data: {month: string, fixedExpenses: number, variableExpenses: number, exceptionalExpenses: number, hobbies: number, remainder: number}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API_URL}/planifications/`,
    data,
  );
  return response.data;
};

const updatePlanification = async (data: {_id: string,
  updatedData: {month: string, fixedExpenses: number, variableExpenses: number, exceptionalExpenses: number, hobbies: number, remainder: number}}) => {
  const response = await axios.put(
    `${import.meta.env.VITE_REACT_APP_API_URL}/planifications/${data._id}`,
    data.updatedData,
  );
  return response.data;
};

const deletePlanification = async (_id: string) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_REACT_APP_API_URL}/planifications/${_id}`,
  );
  return response.data;
};

export {
  getPlanifications,
  getPlanificationByMonth,
  getPlanification,
  createPlanification,
  updatePlanification,
  deletePlanification,
};

