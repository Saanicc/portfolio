import { useState, useEffect } from "react";
import { navigation } from "@/app/navigation";
import Link from "next/link";

const Nav = () => {
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      const sections = navigation.map((item) => item.name.toLowerCase());

      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top <= 100 && rect.bottom >= 100;
          return isVisible;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav>
      <div className="flex flex-row justify-between gap-10 p-6 mx-auto lg:max-w-screen-2xl">
        <div
          id="home"
          className={`flex items-center gap-2 pb-1 border-b-2 ${
            activeSection === "home" ? "border-[#63e]" : "border-transparent"
          }`}
        >
          <Link
            href="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            scroll={false}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-white"
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
          </Link>
        </div>
        <div className="flex flex-row gap-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href="/"
              className={`text-white pb-1 border-b-2 ${
                activeSection === item.name.toLowerCase()
                  ? "border-[#63e]"
                  : "border-transparent"
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.name.toLowerCase());
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
