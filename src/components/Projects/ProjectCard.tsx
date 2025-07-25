import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Project } from "@/types/project";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ImageWithSkeleton = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  const LoadingSpinner = ({ size = 40 }) => (
    <div className="flex items-center justify-center">
      <div
        className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"
        style={{ width: size, height: size }}
      />
    </div>
  );

  return (
    <div className="w-full h-fit relative overflow-hidden rounded-lg mb-4 border border-white/20">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size={32} />
            <p className="text-sm text-gray-500 mt-2">Loading image...</p>
          </div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={400}
        height={0}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        className={`w-full h-auto object-contain transition-all duration-500 ${
          isLoading ? "opacity-0 scale-110" : "opacity-100 scale-100"
        }`}
        priority
      />
    </div>
  );
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const id = `project-${project.id}`;

  useGSAP(() => {
    gsap.fromTo(
      `#${id}`,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.25 + index * 0.25,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: `#${id}`,
          start: "top 80%",
          end: "90% bottom",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <Card
      id={id}
      className="flex-1 min-w-[260px] bg-transparent border-white/20 flex flex-col"
    >
      <CardHeader className="p-4">
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        {project.imageUrl && (
          <ImageWithSkeleton src={project.imageUrl} alt={project.title} />
        )}
        <p className="text-gray-300 text-sm">{project.description}</p>
        {project.technologies && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-white/10 rounded-full text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        {project.githubUrl && (
          <Link
            href={project.githubUrl}
            target="_blank"
            className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              className="w-4 h-4"
            >
              <title>GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span>View on GitHub</span>
          </Link>
        )}
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <ExternalLink size={18} className="text-white" />
            <span>Visit website</span>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
