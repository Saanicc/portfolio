import { TimelineItem } from "@/lib/data/work";
import { useEffect } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SingleProject from "./SingleProject";
import MultipleProjects from "./MultipleProjects";

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
          start: "20% bottom",
        },
      }
    );
  }, [id, item.id]);

  return (
    <div className="flex flex-col items-center relative">
      <div className="hidden md:block absolute w-4 h-4 bg-[hsl(var(--accent))] rounded-full border border-white/50 left-1/2 transform -translate-x-1/2 z-10"></div>
      <div
        className={`flex flex-col w-full md:w-1/2 ${
          isLeft ? "md:self-start md:pr-10" : "md:self-end md:pl-10"
        }`}
      >
        <Card
          id={id}
          className="flex flex-col w-full bg-transparent border-white/20"
        >
          <CardHeader>
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <h4 className="text-lg text-white font-medium">{item.company}</h4>
            <p className="text-gray-300 text-sm mt-1">{item.date}</p>
          </CardHeader>
          <CardContent className="flex-grow">
            {item.project && <SingleProject project={item.project} />}
            {item.projects && <MultipleProjects projects={item.projects} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimelineCard;
