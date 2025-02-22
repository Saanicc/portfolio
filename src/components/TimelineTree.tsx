import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Card, CardContent, CardHeader } from "./ui/card";
import { timelineData } from "@/lib/data/work";
import TimelineCard from "./TimelineCard";

gsap.registerPlugin(ScrollTrigger);

const TimelineTree = () => {
  return (
    <section id="work" className="my-10">
      <Card className="w-full flex flex-col bg-black/20 border-white/20 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[1px] bottom-0 h-full bg-[#ffffff50] hidden md:block"></div>
        <CardHeader>
          <h2 className="text-2xl font-bold text-white">Work experience</h2>
        </CardHeader>
        <CardContent className="px-6">
          <div className="flex flex-col gap-6">
            {timelineData.map((item, index) => (
              <TimelineCard
                key={item.id}
                item={item}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default TimelineTree;
