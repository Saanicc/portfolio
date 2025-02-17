import { Card } from "./ui/card";
import { Skill } from "@/lib/data/skills";
import Image from "next/image";

export default function SkillCard({ id, icon, name, svg }: Skill) {
  return (
    <Card
      key={id}
      className="flex flex-col items-center justify-between min-w-[150px] py-4 text-white bg-black/20 border-white/20 backdrop-blur-sm"
    >
      <div className="flex h-20 items-center justify-center">
        {icon ? (
          <i className={`${icon} text-[2.5rem]`}></i>
        ) : svg ? (
          <div className="">
            <Image src={svg} alt={name} className="w-20 text-[2.5rem]" />
          </div>
        ) : null}
      </div>
      <span className="text-md">{name}</span>
    </Card>
  );
}
