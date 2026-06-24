// Interfaces para el consumo de la API de GitHub
// Usadas por GithubService.ts (getRepos)

export interface Owner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  owner: {
    avatar_url: string;
  };
}