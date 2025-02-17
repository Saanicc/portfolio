import SkillCard from "./SkillCard";
import { skills } from "@/lib/data/skills";

export default function Skills() {
  return (
    <div id="skills" className="w-1/2 py-20 overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
      <div className="flex animate-scroll gap-2">
        {skills.map((skill) => (
          <SkillCard key={skill.id} {...skill} />
        ))}
      </div>
    </div>
  );
}
