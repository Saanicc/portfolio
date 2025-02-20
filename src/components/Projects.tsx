import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data/projects";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function Projects() {
  return (
    <section id="projects" className="my-10">
      <Card className="w-full flex flex-col bg-black/20 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <h2 className="text-2xl font-bold text-white">Personal projects</h2>
        </CardHeader>
        <CardContent
          className="w-full grid gap-6 px-6"
          style={{
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
