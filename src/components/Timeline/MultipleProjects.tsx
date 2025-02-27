import { TimelineItem } from "@/lib/data/work";
import BulletPointDetails from "./BulletPointDetails";
import { CardContent } from "../ui/card";

const MultipleProjects = ({
  projects,
}: {
  projects: TimelineItem["projects"];
}) => {
  if (!projects) return null;

  return (
    <CardContent className="flex-grow">
      {projects.map((project, index) => (
        <div key={project.title} className={`${index % 2 !== 0 ? "mt-4" : ""}`}>
          <h5 className="text-md text-white font-semibold">{project.title}</h5>
          <p className="text-gray-300 text-sm pb-1">{project.summary}</p>
          <BulletPointDetails bulletPoints={project.bulletPointDetails} />
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-white/10 rounded-full text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </CardContent>
  );
};

export default MultipleProjects;
