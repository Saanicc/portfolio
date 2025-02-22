export interface Project {
  id: number;
  title: string;
  description: string;
  technologies?: string[];
  github?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Wallpaper gallery app",
    description:
      "A cross-platform wallpaper gallery app that allows you to browse wallpapers by category and sort by popularity or latest upload on your device and get information about each wallpaper. There is also a button on each wallpaper that allows you to navigate to the uploader's profile on Pixabay or Pixabays download page. The app is built using Expo React Native and uses the Pixabay API to fetch wallpapers. The data you fetch from the API is also cached in your devices local storage for 24 hours.",
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
    description:
      "A modern and responsive portfolio website showcasing projects, skills, and contact information. The website features a clean UI. Built with Next.js and Tailwind CSS, animations are handled with GSAP. The site is hosted on Vercel with GitHub integration for continuous deployment.",
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
