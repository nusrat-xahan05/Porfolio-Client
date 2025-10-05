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