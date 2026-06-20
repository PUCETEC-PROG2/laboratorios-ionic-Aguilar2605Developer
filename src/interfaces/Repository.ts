export interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  owner: {
    avatar_url: string;
  };
}