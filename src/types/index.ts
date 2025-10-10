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
    features: string[];
    thumbnail?: string;
    githubLink: string;
    liveSite: string;
    technologies: string[];
}

export interface UserProps {
    _id?: string;
    name: string;
    email: string;
    role: string;
    isVerified?: boolean;

    techSkills: string[];
}