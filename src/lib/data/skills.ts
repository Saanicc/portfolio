import { StaticImageData } from "next/image";
import ExpoSVG from "../../../public/expo-icon.svg";

export interface Skill {
  id: number;
  name: string;
  icon?: string;
  svg?: StaticImageData;
}

export const skills: Skill[] = [
  {
    id: 1,
    name: "HTML",
    icon: "devicon-html5-plain",
  },
  {
    id: 2,
    name: "CSS",
    icon: "devicon-css3-plain",
  },
  {
    id: 3,
    name: "JavaScript",
    icon: "devicon-javascript-plain",
  },
  {
    id: 4,
    name: "TypeScript",
    icon: "devicon-typescript-plain",
  },
  {
    id: 5,
    name: "React",
    icon: "devicon-react-original",
  },
  {
    id: 6,
    name: "React Native",
    icon: "devicon-react-original",
  },
  {
    id: 7,
    name: "Expo",
    svg: ExpoSVG,
  },
  {
    id: 8,
    name: "Node.js",
    icon: "devicon-nodejs-plain",
  },
  {
    id: 9,
    name: "Git",
    icon: "devicon-git-plain",
  },
  {
    id: 10,
    name: "Next.js",
    icon: "devicon-nextjs-original",
  },
  {
    id: 11,
    name: "Tailwind CSS",
    icon: "devicon-tailwindcss-plain",
  },
];
