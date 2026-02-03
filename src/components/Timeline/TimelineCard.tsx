import { Card, CardHeader } from "@/components/ui/card";
import { Job } from "@/types/jobs";
import TimelineItem from "./TimelineItem";

const TimelineCard: React.FC<{ item: Job; isLeft: boolean }> = ({
  item,
  isLeft,
}) => {
  const id = `timeline-item-${item.id}`;

  return (
    <div className="flex flex-col items-center relative">
      <div className="hidden md:block absolute w-4 h-4 bg-[hsl(var(--accent))] rounded-full border border-white/50 left-1/2 transform -translate-x-1/2 z-10"></div>
      <div
        className={`flex flex-col w-full md:w-1/2 ${
          isLeft ? "md:self-start md:pr-6" : "md:self-end md:pl-6"
        }`}
      >
        <Card
          id={id}
          className="flex flex-col w-full bg-black/30 border-white/20"
        >
          <CardHeader className="p-4">
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <h4 className="text-lg text-white font-medium">{item.company}</h4>
            <p className="text-gray-300 text-sm mt-1">{item.date}</p>
          </CardHeader>
          <TimelineItem items={item.projects} />
        </Card>
      </div>
    </div>
  );
};

export default TimelineCard;
