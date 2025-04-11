import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || '';

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}Auth/login`, credentials);
  return response.data;
};

const authService = {
  login
};

export default authService;