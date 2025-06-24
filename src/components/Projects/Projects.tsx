import ProjectCard from "./ProjectCard";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/firebase/projects";
import { Project } from "@/types/project";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="min-w-full min-h-96">
      <Card className="w-full flex flex-col bg-black/20 border-white/20">
        <CardHeader className="p-4">
          <h2 className="text-2xl font-bold text-white">Personal projects</h2>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 p-4 pt-0">
          {projects
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            )
            .map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </CardContent>
      </Card>
    </section>
  );
}
