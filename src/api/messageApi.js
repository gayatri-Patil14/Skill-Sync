import api from './axiosConfig';

export const getMessages = async (userId) => {
  const response = await api.get(`/messages/${userId}`);
  return response.data;
};

export const sendMessage = async (data) => {
  const response = await api.post('/messages', data);
  return response.data;
};

export const markMessagesAsRead = async (senderId) => {
  const response = await api.put(`/messages/read/${senderId}`);
  return response.data;
};
