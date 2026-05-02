import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const taskService = {
  createTask: (data) => api.post('/taskbox/create', data),
  getActive: (phone) => api.get(`/taskbox/${phone}/active`),
  submitProof: (id, url) => api.post(`/taskbox/${id}/submit-proof`, { proofUrl: url }),
  getHistory: (phone) => api.get(`/taskbox/${phone}/history`), //
};

export default api;