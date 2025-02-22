import SkillCard from "./SkillCard";
import { skills } from "@/lib/data/skills";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function Skills() {
  return (
    <section id="skills" className="w-full">
      <Card className="h-full flex flex-col bg-black/20 border-white/20">
        <CardHeader>
          <h2 className="text-2xl font-bold text-white">Skills</h2>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <SkillCard key={skill.id} {...skill} />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
