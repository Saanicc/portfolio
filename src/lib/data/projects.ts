import wallpaperGallery from "../../../public/assets/wallpaper-gallery.png";
import portfolio from "../../../public/assets/portfolio.png";
import { StaticImageData } from "next/image";

export interface Project {
  id: number;
  title: string;
  image?: StaticImageData;
  description: string;
  technologies?: string[];
  github?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Wallpaper gallery app",
    image: wallpaperGallery,
    description:
      "A cross-platform photo gallery app where you can browse photos. You can sort by popularity or latest upload and filter by category. The data you fetch from the API is cached on your devices local storage for 24 hours.",
    technologies: [
      "React Native",
      "Expo",
      "Pixabay API",
      "TypeScript",
      "Tanstack Query",
      "React Native Reanimated",
    ],
    github: "https://github.com/Saanicc/WallpaperGallery",
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    image: portfolio,
    description:
      "Personal portfolio website that showcases my work experience, personal projects, skills, and a form to contact me. The website is built with Next.js, Tailwind CSS, animations are handled with GSAP and the contact form is handled with EmailJS. The website is hosted on Vercel with GitHub integration for continuous deployment.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Vercel",
      "EmailJS",
    ],
    github: "https://github.com/Saanicc/portfolio",
  },
];
