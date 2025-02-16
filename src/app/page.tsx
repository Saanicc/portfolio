"use client";

import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";

export default function Home() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-screen overflow-auto relative">
      <div className="fixed h-screen inset-0 -z-10 w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <Nav />
      <main className="flex flex-col items-center justify-center min-h-screen flex-wrap px-24">
        <Hero scrollToProjects={scrollToProjects} />
      </main>
      <Projects />
    </div>
  );
}
