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
    title: "Mobile wallpaper gallery app",
    description:
      "A cross-platform wallpaper gallery app that allows you to browse wallpapers by category and sort by popularity or latest upload on your device and get information about each wallpaper. There is also a button on each wallpaper that allows you to navigate to the uploader's profile on Pixabay or Pixabays download page. The app is built using Expo React Native and uses the Pixabay API to fetch wallpapers.",
    technologies: [
      "React Native",
      "Expo",
      "Pixabay API",
      "TypeScript",
      "Tanstack Query",
      "React Native Reanimated",
    ],
    github: "https://github.com/Saanicc/wallpaper-gallery",
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description of Project 2",
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description of Project 3",
  },
  {
    id: 4,
    title: "Project 4",
    description: "Description of Project 4",
  },
  {
    id: 5,
    title: "Project 5",
    description: "Description of Project 5",
  },
];
