"use client";

import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import About from "@/components/About";
import { Toaster } from "@/components/ui/toaster";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  useGSAP(() => {
    gsap.fromTo(
      "#about",
      { opacity: 0, x: -500, y: 250 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.75,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      "#projects",
      { opacity: 0, y: 500 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#projects",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      "#skills",
      { opacity: 0, x: 500, y: 250 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.75,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#skills",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
    gsap.fromTo(
      "#contact",
      { opacity: 0, x: 750 },
      {
        opacity: 1,
        x: 0,
        duration: 0.75,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const scrollToAbout = () => {
    document
      .getElementById("about")
      ?.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed h-full inset-0 -z-10 w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <Nav />
      </header>
      <main className="flex flex-col items-center md:px-24 mx-auto lg:max-w-screen-2xl max-w-screen-1xl">
        <Hero scrollToAbout={scrollToAbout} />
        <div className="flex flex-col sm:flex-row w-full px-4 my-10 md:px-0 gap-4">
          <About />
          <Skills />
        </div>
        <Projects />
        <Contact />
      </main>
      <footer className="mt-20 p-4 left-0 right-0 z-50 backdrop-blur-md bg-white/5 border-t border-white/10">
        <p className="text-center text-white/50 text-sm">
          &copy; {new Date().getFullYear()} MattansTechLab. All rights reserved.
        </p>
      </footer>
      <Toaster />
    </>
  );
}
