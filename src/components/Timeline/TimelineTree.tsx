import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Job } from "@/types/jobs";
import TimelineCard from "./TimelineCard";
import { useEffect, useState } from "react";
import { getJobs } from "@/lib/firebase/jobs";

gsap.registerPlugin(ScrollTrigger);

const TimelineTree = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs();
      setJobs(data);
    };

    fetchJobs();
  }, []);

  return (
    <section id="work" className="min-w-full min-h-96">
      <Card className="w-full flex flex-col bg-black/20 border-white/20 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[1px] bottom-0 h-full bg-[#ffffff50] hidden md:block"></div>
        <CardHeader className="p-4">
          <h2 className="text-2xl font-bold text-white">Work experience</h2>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-col gap-4">
            {jobs.map((item, index) => (
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
