import axios from 'axios'

const getYears = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/years/`,
  );
  return data.years;
};

const getYear = async (_id: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/years/${_id}`,
  );
  return data.year;
};

const createYear = async (data: {name: string}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API_URL}/years/`,
    data,
  );
  return response.data;
};

const updateYear = async (data: {_id: string, updatedData: {name: string}}) => {
  const response = await axios.put(
    `${import.meta.env.VITE_REACT_APP_API_URL}/years/${data._id}`,
    data.updatedData,
  );
  return response.data;
};

const deleteYear = async (_id: string) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_REACT_APP_API_URL}/years/${_id}`,
  );
  return response.data;
};

export {
  getYears,
  getYear,
  createYear,
  updateYear,
  deleteYear,
};

