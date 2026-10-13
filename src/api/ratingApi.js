import api from './axiosConfig';

export const getRatings = async (userId) => {
  const response = await api.get(`/ratings/user/${userId}`);
  return response.data;
};

export const createRating = async (data) => {
  const response = await api.post('/ratings', data);
  return response.data;
};
