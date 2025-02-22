import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CardContent } from "./ui/card";
import { timelineData } from "@/lib/data/work";
import TimelineCard from "./TimelineCard";

gsap.registerPlugin(ScrollTrigger);

const TimelineTree = () => {
  return (
    <section id="work" className="my-10 w-full">
      <CardContent className="p-0">
        <div className="flex flex-col gap-6">
          {timelineData.map((item, index) => (
            <TimelineCard key={item.id} item={item} isLeft={index % 2 === 0} />
          ))}
        </div>
      </CardContent>
    </section>
  );
};

export default TimelineTree;
