"use client";

import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import About from "@/components/About";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed h-full inset-0 -z-10 w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <Nav />
      </header>
      <main className="flex flex-col items-center md:px-24 mx-auto lg:max-w-screen-2xl">
        <Hero scrollToAbout={scrollToAbout} />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Toaster />
    </>
  );
}
