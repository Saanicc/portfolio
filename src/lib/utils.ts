import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToSection = (sectionId: string) => {
  switch (sectionId) {
    case "home":
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;
    case "about":
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const yOffset = -75;
        const y =
          aboutSection.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      break;
    case "work":
      const workSection = document.getElementById("work");
      if (workSection) {
        const yOffset = -75;
        const y =
          workSection.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      break;
    case "projects":
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        const yOffset = -75;
        const y =
          projectsSection.getBoundingClientRect().top +
          window.scrollY +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      break;
    case "contact":
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const yOffset = -75;
        const y =
          contactSection.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      break;
    default:
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;
  }
};
