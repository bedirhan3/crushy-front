import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || '';

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}Auth/admin-login`, credentials);
  return response.data;
};

export default {
  login
};