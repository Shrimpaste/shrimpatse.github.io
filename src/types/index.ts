export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
}

export type Theme = 'dark' | 'light';
