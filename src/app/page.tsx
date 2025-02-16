"use client";

import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Projects from "@/components/Projects";

export default function Home() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-screen overflow-auto relative">
      <div className="fixed h-screen inset-0 -z-10 w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <Nav />
      <main className="flex flex-col items-center justify-center min-h-screen">
        <Hero scrollToProjects={scrollToProjects} />
      </main>
      <Projects />
    </div>
  );
}

const Hero = ({ scrollToProjects }: { scrollToProjects: () => void }) => {
  return (
    <>
      <h1 className="text-4xl font-bold text-white">
        Hello, I'm a Frontend Developer
      </h1>
      <p className="text-lg text-white mt-4 text-center max-w-2xl">
        I specialize in creating seamless user experiences for web and mobile
        applications using React and React Native. Passionate about building
        intuitive, responsive interfaces that users love.
      </p>
      <Button
        variant="ghost"
        size="icon"
        onClick={scrollToProjects}
        className="mt-12 animate-bounce hover:bg-white/10"
      >
        <ChevronDown className="h-8 w-8 text-white" />
      </Button>
    </>
  );
};
