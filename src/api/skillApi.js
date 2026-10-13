import api from './axiosConfig';

export const getAllSkills = async () => {
  const response = await api.get('/skills/all');
  return response.data;
};

export const getSkillById = async (id) => {
  const response = await api.get(`/skills/${id}`);
  return response.data;
};

export const createSkill = async (skillData) => {
  const response = await api.post('/skills/create', skillData);
  return response.data;
};

export const updateSkill = async (id, skillData) => {
  const response = await api.put(`/skills/${id}`, skillData);
  return response.data;
};

export const deleteSkill = async (id) => {
  const response = await api.delete(`/skills/${id}`);
  return response.data;
};
