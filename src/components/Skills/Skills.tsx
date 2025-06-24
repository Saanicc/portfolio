import SkillCard from "./SkillCard";
import { Card, CardContent, CardHeader } from "../ui/card";
import { getSkills } from "@/lib/firebase/skills";
import { Skill } from "@/types/skill";
import { useEffect, useState } from "react";

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const data = await getSkills();
      setSkills(data);
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="w-full min-h-full">
      <Card className="h-full flex flex-col bg-black/20 border-white/20">
        <CardHeader className="p-4">
          <h2 className="text-2xl font-bold text-white">Skills</h2>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 p-4 pt-0">
          {skills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
