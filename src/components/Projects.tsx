import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <h2 className="text-3xl font-bold text-white mb-12">My projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl px-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
