export interface BlogProps {
  _id: string;
  title: string;
  content: string;
  slug: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  viewCount: number;
}

export interface ProjectProps {
    _id?: string;
    title: string;
    slug?: string;
    description: string;
    thumbnail?: string;
    githubLink: string;
    liveSite: string;
    technologies: string[];
}