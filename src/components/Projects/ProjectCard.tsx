import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Project } from "@/lib/data/projects";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
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
        delay: 0.25 + (project.id - 1) * 0.25,
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
      className="flex-1 min-w-[300px] bg-transparent border-white/20 flex flex-col"
    >
      <CardHeader>
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
      </CardHeader>
      <CardContent className="flex-grow">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            className="w-auto h-auto aspect-auto mb-4"
          />
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
      {project.github && (
        <CardFooter>
          <Link
            href={project.github}
            target="_blank"
            className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              className="w-6 h-6"
            >
              <title>GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span>View on GitHub</span>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
