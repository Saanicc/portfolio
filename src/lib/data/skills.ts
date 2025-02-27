import { StaticImageData } from "next/image";
import ExpoSVG from "../../../public/expo-icon.svg";

export interface Skill {
  id: number;
  name: string;
  icon?: string;
  svg?: StaticImageData;
  ranking: 1 | 2 | 3 | 4 | 5;
}

export const skills: Skill[] = [
  {
    id: 1,
    name: "HTML",
    icon: "devicon-html5-plain",
    ranking: 5,
  },
  {
    id: 2,
    name: "CSS",
    icon: "devicon-css3-plain",
    ranking: 4,
  },
  {
    id: 3,
    name: "JavaScript",
    icon: "devicon-javascript-plain",
    ranking: 5,
  },
  {
    id: 4,
    name: "TypeScript",
    icon: "devicon-typescript-plain",
    ranking: 4,
  },
  {
    id: 5,
    name: "React",
    icon: "devicon-react-original",
    ranking: 5,
  },
  {
    id: 6,
    name: "React Native",
    icon: "devicon-react-original",
    ranking: 5,
  },
  {
    id: 7,
    name: "Expo",
    svg: ExpoSVG,
    ranking: 5,
  },
  {
    id: 9,
    name: "Git",
    icon: "devicon-git-plain",
    ranking: 4,
  },
  {
    id: 11,
    name: "Tailwind CSS",
    icon: "devicon-tailwindcss-plain",
    ranking: 4,
  },
];
