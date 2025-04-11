import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || '';

const getDashboardStats = async (token) => {
  const response = await axios.get(`${baseUrl}Admin/dashboard/stats`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const dashboardService = {
  getDashboardStats
};

export default dashboardService;