import { useState, useEffect } from "react";
import { navigation } from "@/app/navigation";
import Link from "next/link";
import { House } from "lucide-react";
import { useScrollTo } from "@/hooks/useScrollTo";

const Nav = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const { scrollToSection } = useScrollTo();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight;
      const bottomThreshold = document.documentElement.scrollHeight - 100;

      if (scrollPosition >= bottomThreshold) {
        setActiveSection("contact");
        return;
      }

      const sections = navigation.map((item) => item.name.toLowerCase());

      const current = sections.find((section) => {
        if (section === "contact") return false;

        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
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

  return (
    <div className="fixed bottom-0 sm:bottom-auto w-full flex items-center justify-center z-10">
      <div className="flex flex-row gap-6 px-4 py-4 w-full sm:w-auto items-center justify-evenly sm:justify-center bg-black/20 border-t-[1px] sm:border-t-0 sm:border-b-2 sm:border-x-2 border-white/20 sm:rounded-bl-xl sm:rounded-br-xl sm:rounded-tl-none sm:rounded-tr-none backdrop-blur-md">
        <div
          id="home"
          className={`flex items-center justify-center pb-1 border-b-2 ${
            activeSection === "home" ? "border-accent" : "border-transparent"
          }`}
        >
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            scroll={false}
          >
            <House />
          </Link>
        </div>
        {navigation.map((item) => (
          <div
            key={item.name}
            className={`text-white pb-1 border-b-2 ${
              activeSection === item.name.toLowerCase()
                ? "border-accent"
                : "border-transparent"
            }`}
          >
            <Link
              href="#"
              className={`text-white pb-1  ${
                activeSection === item.name.toLowerCase()
                  ? "border-accent"
                  : "border-transparent"
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.name.toLowerCase());
              }}
            >
              <div className="block sm:hidden">
                <item.icon />
              </div>
              <div className="hidden sm:block">{item.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nav;
