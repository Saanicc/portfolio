import { CardContent } from "../ui/card";
import { Job } from "@/types/jobs";
import Markdown from "react-markdown";

const TimelineItem = ({ items }: { items: Job["projects"] }) => {
  if (!items) return null;

  return (
    <CardContent className="flex-grow p-4 pt-0">
      {items.map((project, index) => (
        <div key={project.title} className={`${index % 2 !== 0 ? "mt-4" : ""}`}>
          <h5 className="text-md text-white font-semibold">{project.title}</h5>
          <div className="text-gray-300 text-sm pb-1">
            <Markdown>{project.summary}</Markdown>
          </div>
          <div className="text-gray-300 text-sm">
            <Markdown>{project.details}</Markdown>
          </div>
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

export default TimelineItem;
