import { TimelineItem } from "@/lib/data/work";
import { useEffect } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const TimelineCard: React.FC<{ item: TimelineItem; isLeft: boolean }> = ({
  item,
  isLeft,
}) => {
  const id = `timeline-item-${item.id}`;

  useEffect(() => {
    gsap.fromTo(
      `#${id}`,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        delay: 0.25,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: `#${id}`,
          start: "50% bottom",
          end: "60% center",
        },
      }
    );
  }, [id, item.id]);

  return (
    <div
      className={`flex flex-col items-center
        ${isLeft ? "md:items-start md:mr-4" : "md:items-end md:ml-4"}
      `}
    >
      <Card
        id={id}
        className="flex flex-col w-full md:w-1/2 bg-transparent border-white/20"
      >
        <CardHeader>
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          <h4 className="text-lg text-white font-medium">{item.company}</h4>
          <p className="text-gray-300 text-sm mt-1">{item.date}</p>{" "}
        </CardHeader>
        <CardContent className="flex-grow">
          {item.description && (
            <>
              {typeof item.description === "string" && (
                <p className="text-gray-300 text-sm">{item.description}</p>
              )}
              {typeof item.description === "object" && (
                <>
                  <p className="text-gray-300 text-sm">
                    {item.description.textBefore}
                  </p>
                  <ul className="list-disc list-inside pl-2 my-1">
                    {item.description.bulletPoints.map((point) => (
                      <li key={point} className="text-gray-300 text-sm">
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-300 text-sm">
                    {item.description.textAfter}
                  </p>
                </>
              )}
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-white/10 rounded-full text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
          {item.projects && (
            <>
              {item.projects.map((project, index) => (
                <div
                  key={project.title}
                  className={`${index % 2 !== 0 ? "mt-4" : ""}`}
                >
                  <h5 className="text-md text-white font-semibold">
                    {project.title}
                  </h5>
                  <p className="text-gray-300 text-sm">{project.description}</p>
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineCard;
