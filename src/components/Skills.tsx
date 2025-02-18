import SkillCard from "./SkillCard";
import { skills } from "@/lib/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="w-full">
      <div className="w-full h-full p-6 bg-black/20 border border-white/20 backdrop-blur-sm rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-5">My skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <SkillCard key={skill.id} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
