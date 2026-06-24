import axios from 'axios';
import type { Repository } from '../interfaces/Repository';
import type { User } from '../interfaces/UserInterface';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Método GET que trae los repositorios
export const getRepos = async (): Promise<Repository[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      },
      params: {
        per_page: 100,
        sort: 'created',
        direction: 'desc',
        affiliation: 'owner',
        t: Date.now() // Evitar cache
      }
    });
    if (response.status !== 200) {
      throw new Error(`${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
}

// Método GET que trae los datos del usuario autenticado
export const getUser = async (): Promise<User> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      },
    });
    if (response.status !== 200) {
      throw new Error(`${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
}