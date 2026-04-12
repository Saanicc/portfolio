"use client";

import { Card } from "../ui/card";
import { Skill } from "@/types/skill";

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const skillId = `skill-${skill.id}`;

  return (
    <Card
      id={skillId}
      className="flex-1 flex flex-col gap-2 p-3 text-white bg-black/20 border-white/20"
    >
      <div className="flex gap-[10px] w-full items-center">
        <div className="flex h-auto items-center justify-center">
          <i className={`${skill.icon} text-[1.5rem]`}></i>
        </div>
        <span className="text-sm">{skill.name}</span>
      </div>
    </Card>
  );
}
