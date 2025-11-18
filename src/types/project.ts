export interface Project {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  imageUrls?: string[];
  githubUrl?: string;
  liveUrl?: string;
}
