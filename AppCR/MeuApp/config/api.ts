import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cr-cursos-app-2.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;