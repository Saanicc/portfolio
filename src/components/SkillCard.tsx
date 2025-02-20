import { Card } from "./ui/card";
import { Skill } from "@/lib/data/skills";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function SkillCard({ id, icon, name, svg }: Skill) {
  const skillId = `skill-${id}`;

  useGSAP(() => {
    gsap.fromTo(
      `#${skillId}`,
      {
        opacity: 0,
        x: 500,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5 + (id - 1) * 0.1,
        delay: 0.5,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: `#${skillId}`,

          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <Card
      id={skillId}
      key={id}
      className="flex items-center justify-center gap-2 p-3 text-white bg-black/20 border-white/20 backdrop-blur-sm"
    >
      <div className="flex h-auto items-center justify-center">
        {icon ? (
          <i className={`${icon} text-[1.25rem]`}></i>
        ) : svg ? (
          <Image src={svg} alt={name} className="w-[3rem] text-[1.25rem]" />
        ) : null}
      </div>
      <span className="text-sm">{name}</span>
    </Card>
  );
}
