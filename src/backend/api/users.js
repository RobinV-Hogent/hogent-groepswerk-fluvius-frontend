import { axios } from ".";

export const login = async (username, password) => {
  const { data } = await axios.post(`users/login`, {
    username,
    password,
  });

  return data;
};

export const getById = async (id) => {
  const { data } = await axios.get(`users/${id}`);

  return data;
};

export const getTemplate = async () => {
  const { data } = await axios.get(`users/template`);
  return data;
};
