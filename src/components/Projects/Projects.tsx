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
    undefined,
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
          className="z-[51] bg-black border-white/20 w-full max-h-[90vh] overflow-hidden md:w-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="flex flex-row gap-4 justify-between items-center border-b border-white/20 bg-black p-4">
            <h1 className="text-xl font-bold text-white">
              {selectedProject?.title}
            </h1>
            <X
              className="text-white hover:text-white/70 cursor-pointer"
              onClick={() => setShowImageModal(false)}
            />
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4 items-center overflow-y-auto p-4">
            {selectedProject?.imageUrls?.map((image, index) => (
              <Image
                key={index}
                src={image ?? ""}
                alt={`Image showcasing the ${selectedProject?.title} project`}
                width={isMobile ? 400 : 900}
                height={0}
                className={
                  "flex flex-1 object-cover transition-all duration-500 border-white/20 border rounded-lg"
                }
                priority
              />
            ))}
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
                  new Date(b.createdAt).getTime(),
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
