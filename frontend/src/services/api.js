import axios from 'axios';

// Use environment variables for API URLs, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to get full media URL
export const getMediaUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${BACKEND_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

export const portfolioAPI = {
  getProfile: () => api.get('/profile/'),
  getSkills: () => api.get('/skills/'),
  getProjects: () => api.get('/projects/'),
  getExperience: () => api.get('/experience/'),
  getEducation: () => api.get('/education/'),
  submitContact: (data) => api.post('/contact/', data),
};

export default api;
