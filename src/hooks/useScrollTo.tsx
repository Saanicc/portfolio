import { useScreenSize } from "./useScreenSize";

export const useScrollTo = () => {
  const { isMobile } = useScreenSize();

  const yOffset = isMobile ? -16 : -80;

  const scrollToSection = (sectionId: string) => {
    switch (sectionId) {
      case "home":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "about":
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          const y =
            aboutSection.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
        break;
      case "work":
        const workSection = document.getElementById("work");
        if (workSection) {
          const y =
            workSection.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
        break;
      case "projects":
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
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
          const y =
            contactSection.getBoundingClientRect().top +
            window.scrollY +
            yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
        break;
      default:
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
    }
  };

  return {
    scrollToSection,
  };
};
