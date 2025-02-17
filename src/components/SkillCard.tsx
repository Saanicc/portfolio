import { Card } from "./ui/card";
import { Skill } from "@/lib/data/skills";

export default function SkillCard({ id, icon, name }: Skill) {
  return (
    <Card
      key={id}
      className="flex flex-col items-center justify-center min-w-[150px] py-4 text-white bg-black/20 border-white/20 backdrop-blur-sm"
    >
      <i className={`${icon} text-4xl mb-4`}></i>
      <span className="text-md">{name}</span>
    </Card>
  );
}
