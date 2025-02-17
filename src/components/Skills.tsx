import SkillCard from "./SkillCard";
import { skills } from "@/lib/data/skills";

export default function Skills() {
  return (
    <div id="skills" className="w-2/3 py-20 overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-128px),transparent_100%)] sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <div className="flex items-center justify-center md:justify-start [&_div]:mx-2 animate-infinite-scroll">
          {skills.map((skill) => (
            <SkillCard key={skill.id} {...skill} />
          ))}
        </div>
        <div className="flex items-center justify-center md:justify-start [&_div]:mx-2 animate-infinite-scroll">
          {skills.map((skill) => (
            <SkillCard key={`${skill.id}-clone`} {...skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
