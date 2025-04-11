import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || 'https://localhost:7161/api/';

// Kullanıcıları getir
const getUsers = async (token) => {
  const response = await axios.get(`${baseUrl}Admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Kullanıcı sil
const deleteUser = async (userId, token) => {
  const response = await axios.delete(`${baseUrl}Admin/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Kullanıcı bilgilerini güncelle
const updateUser = async (userId, userData, token) => {
  const response = await axios.put(`${baseUrl}Admin/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Yeni kullanıcı oluştur
const createUser = async (userData, token) => {
  const response = await axios.post(`${baseUrl}Admin/users`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const getUserById = async (userId, token) => {
    const response = await axios.get(`${baseUrl}Admin/users/${userId}/detailed-report`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

const generalService = {
  getUsers,
  deleteUser,
  updateUser,
  createUser,
  getUserById
};

export default generalService;