"use client";

import { Card } from "../ui/card";
import { Skill } from "@/lib/data/skills";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { gsap } from "gsap";

export default function SkillCard({ id, icon, name, svg, ranking }: Skill) {
  const skillId = `skill-${id}`;

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
        duration: 0.5 + (id - 1) * 0.1,
        delay: 0.5,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: `#skills`,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [id, skillId]);

  const renderRankingDots = () => {
    const dots = [];
    const maxRanking = 5;

    for (let i = 1; i <= maxRanking; i++) {
      dots.push(
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i <= ranking ? "bg-white" : "bg-white/30"
          }`}
        />
      );
    }

    return dots;
  };

  return (
    <Card
      id={skillId}
      className="flex flex-col gap-2 p-3 text-white bg-black/20 border-white/20"
    >
      <div className="flex gap-2 w-full">
        <div className="flex h-auto items-center justify-center">
          {icon ? (
            <i className={`${icon} text-[1.25rem]`}></i>
          ) : svg ? (
            <Image src={svg} alt={name} className="w-[3rem] text-[1.25rem]" />
          ) : null}
        </div>
        <span className="text-sm">{name}</span>
      </div>
      <div className="flex gap-1 mt-1">{renderRankingDots()}</div>
    </Card>
  );
}
