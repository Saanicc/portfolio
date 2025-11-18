import ProjectCard from "./ProjectCard";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ReactNode, useEffect, useState } from "react";
import { getProjects } from "@/lib/firebase/projects";
import { Project } from "@/types/project";
import { X } from "lucide-react";
import Image from "next/image";
import { useScreenSize } from "@/hooks/useScreenSize";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined
  );
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  const handleProjectImageClick = (project: Project) => {
    setSelectedProject(project);
    setShowImageModal(true);
  };

  const ImageModal = (): ReactNode => {
    const { isMobile } = useScreenSize();

    return (
      <div
        className="h-screen w-screen fixed top-0 left-0 z-50 no-doc-scroll bg-black/80 flex justify-center items-center p-4"
        onClick={() => setShowImageModal(false)}
      >
        <Card
          className="z-[51] bg-black border-white/20 w-full h-auto overflow-auto max-h-screen md:w-auto xl:h-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="flex flex-row gap-4 justify-between items-center">
            <h1 className="text-2xl font-bold text-white">
              {selectedProject?.title}
            </h1>
            <X
              className="text-white hover:text-white/70 cursor-pointer"
              onClick={() => setShowImageModal(false)}
            />
          </CardHeader>
          <CardContent className="flex justify-center items-center h-auto">
            <div className="">
              <Image
                src={selectedProject?.imageUrl ?? ""}
                alt={`Image showcasing the ${selectedProject?.title} project`}
                width={isMobile ? 400 : 1000}
                height={0}
                className={
                  "flex flex-1 object-cover transition-all duration-500 border-white/20 border rounded-lg"
                }
                priority
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <>
      {showImageModal && <ImageModal />}
      <section id="projects" className="min-w-full min-h-96">
        <Card className="w-full flex flex-col bg-black/20 border-white/20">
          <CardHeader className="p-4">
            <h2 className="text-2xl font-bold text-white">Personal projects</h2>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pt-0">
            {projects
              .sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              )
              .map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onImageClick={handleProjectImageClick}
                />
              ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
