import api from './axiosConfig';

export const sendRequest = async (requestData) => {
  const response = await api.post('/requests/send', requestData);
  return response.data;
};

export const getMyRequests = async () => {
  const response = await api.get('/requests/my');
  return response.data;
};

export const updateRequestStatus = async (id, status) => {
  const response = await api.put(`/requests/${id}`, { status });
  return response.data;
};
