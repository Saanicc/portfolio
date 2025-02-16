import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <h2 className="text-3xl font-bold text-white mb-12">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl px-4">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </section>
  );
}
