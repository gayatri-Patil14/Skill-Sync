import api from './axiosConfig';

export const getAchievements = async (userId = '') => {
  const url = userId ? `/achievements/${userId}` : '/achievements';
  const response = await api.get(url);
  return response.data;
};

export const createAchievement = async (data) => {
  const response = await api.post('/achievements', data);
  return response.data;
};
