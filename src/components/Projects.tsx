import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data/projects";
import { Card, CardHeader } from "./ui/card";

export default function Projects() {
  return (
    <section id="projects" className="px-4 md:px-0 my-10">
      <Card className="w-full flex flex-col p-2 pb-6 bg-black/20 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <h2 className="text-2xl font-bold text-white">Personal projects</h2>
        </CardHeader>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-6 px-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Card>
    </section>
  );
}
