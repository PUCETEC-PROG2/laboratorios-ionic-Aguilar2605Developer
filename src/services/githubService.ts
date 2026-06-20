import axios from 'axios';

// 1. Configuro axios
const apiClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/json',
  }
});

//2. Este interceptor es para no tener que estar pasando el token en cada peticion
apiClient.interceptors.request.use((config) => {
  
  const token = import.meta.env.VITE_GITHUB_TOKEN; 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Llamo al método Get para traer los repositorios que estan en la API 
export const getRepos = () => apiClient.get('/user/repos');
export const getUser = () => apiClient.get('/user');
