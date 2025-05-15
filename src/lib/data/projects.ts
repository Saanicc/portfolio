import wallpaperGallery from "../../../public/assets/wallpaper-gallery.png";
import portfolio from "../../../public/assets/portfolio.png";
import nationsHub from "../../../public/assets/nations-hub.png";
import { StaticImageData } from "next/image";

export interface Project {
  id: number;
  title: string;
  image?: StaticImageData;
  description: string;
  technologies?: string[];
  github?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Nations Hub",
    image: nationsHub,
    description:
      "Your place for information about countries around the world. You can search for a country and get information about its population, currency, languages, and more.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
      "Restcountries API",
      "Tanstack Query",
    ],
    github: "https://github.com/Saanicc/nations-hub",
    liveUrl: "https://nations-hub.mattanstechlab.com/",
  },
  {
    id: 2,
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
    id: 3,
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
