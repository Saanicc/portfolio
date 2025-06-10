"use client";

import { Card } from "../ui/card";
import { Skill } from "@/types/skill";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import svg from "../../../public/expo-icon.svg";
import Image from "next/image";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  const skillId = `skill-${skill.id}`;

  useGSAP(() => {
    gsap.fromTo(
      `#${skillId}`,
      {
        opacity: 0,
        x: 200,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5 + index * 0.1,
        delay: 0.5,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: `#skills`,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [index, skillId]);

  const SkillRanking = ({ ranking }: { ranking: Skill["ranking"] }) => {
    const maxRanking = 5;
    const rankingLabels = [
      "Learning",
      "Familiar",
      "Comfortable",
      "Proficient",
      "Experienced",
    ];

    return (
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          {Array.from({ length: maxRanking }, (_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
                i <= ranking ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-white/80">{rankingLabels[ranking]}</span>
      </div>
    );
  };

  const isDevicon = skill.icon !== "expo-icon" ? true : false;

  return (
    <Card
      id={skillId}
      className="flex flex-col gap-2 p-3 text-white bg-black/20 border-white/20"
    >
      <div className="flex gap-2 w-full">
        <div className="flex h-auto items-center justify-center">
          {skill.icon && isDevicon ? (
            <i className={`${skill.icon} text-[1.25rem]`}></i>
          ) : (
            svg && (
              <Image
                src={svg}
                alt={skill.name}
                className="w-[3rem] text-[1.25rem]"
              />
            )
          )}
        </div>
        <span className="text-sm">{skill.name}</span>
      </div>
      <div className="flex flex-col gap-1 mt-1">
        <SkillRanking ranking={skill.ranking} />
      </div>
    </Card>
  );
}
