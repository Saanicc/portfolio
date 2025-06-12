type Project = {
  title?: string;
  summary: string;
  details: string;
  tags: string[];
};

export type Job = {
  id: string;
  title: string;
  company: string;
  date: string;
  projects: Project[];
};
