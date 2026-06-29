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
// Método POST que crea nuevos repositorios
export const postRepos = async (data: Pick<Repository, 'name' | 'description'>): Promise<Repository> => {
  try {
    const response = await axios.post(`${GITHUB_API_URL}/user/repos`, data, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      },
    });
    if (response.status !== 201) {
      throw new Error(`${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
}
// Método PATCH que actualiza los repositorios
export const updateRepo = async (owner: string, repoName: string, data: Pick<Repository, 'name' | 'description'>): Promise<Repository> => {
  try {
    const response = await axios.patch(`${GITHUB_API_URL}/repos/${owner}/${repoName}`, data, {
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

// Método DELETE que elimina un repositorio
export const deleteRepo = async (owner: string, repoName: string): Promise<void> => {
  try {
    const response = await axios.delete(`${GITHUB_API_URL}/repos/${owner}/${repoName}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      },
    });
    if (response.status !== 204) {
      throw new Error(`${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
}