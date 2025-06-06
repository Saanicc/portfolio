import { TimelineItem } from "@/lib/data/work";
import BulletPointDetails from "./BulletPointDetails";
import { CardContent } from "../ui/card";

const SingleProject = ({ project }: { project: TimelineItem["project"] }) => {
  if (!project) return null;

  return (
    <CardContent className="flex-grow">
      <p className="text-gray-300 text-sm pb-1">{project.summary}</p>
      <BulletPointDetails bulletPoints={project.bulletPointDetails} />
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-white/10 rounded-full text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </CardContent>
  );
};

export default SingleProject;
