import api from './axiosConfig';

export const getSessions = async () => {
  const response = await api.get('/sessions');
  return response.data;
};

export const createSession = async (data) => {
  const response = await api.post('/sessions', data);
  return response.data;
};

export const updateSessionStatus = async (id, status, meetingLink) => {
  const response = await api.put(`/sessions/${id}/status`, { status, meetingLink });
  return response.data;
};
