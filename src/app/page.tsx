"use client";

import Nav from "@/components/Nav";
import Projects from "@/components/Projects/Projects";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills/Skills";
import Contact from "@/components/Contact";
import About from "@/components/About";
import { Toaster } from "@/components/ui/toaster";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineTree from "@/components/Timeline/TimelineTree";
import Footer from "@/components/Footer";
import { BackgroundGradient } from "@/components/BackgroundGradient";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  useGSAP(() => {
    gsap.fromTo(
      "#about-info",
      { opacity: 0, x: -100, scale: 1.1 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.5,
        delay: 0.25,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#about-info",
          start: "top 70%",
          end: "90% bottom",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      "#skills",
      { opacity: 0, x: 100, scale: 1.1 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.5,
        delay: 0.25,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#skills",
          start: "top 70%",
          end: "90% bottom",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      "#work",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#work",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      "#projects",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: "#projects",
          start: "top 80%",
          end: "90% bottom",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      "#contact",
      { opacity: 0, scale: 0.95, y: 200 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        delay: 0.5,
        ease: "sine",
        duration: 0.5,
        scrollTrigger: {
          trigger: "#contact",
          start: "40% bottom",
        },
      }
    );
  }, []);

  return (
    <>
      <BackgroundGradient />
      <Nav />
      <main className="flex flex-col items-center overflow-hidden">
        <div className="flex flex-col items-center justify-center px-5 md:max-w-4xl lg:max-w-screen-xl">
          <Hero />
          <section
            id="about"
            className="flex flex-col sm:flex-row w-full my-20 md:px-0 gap-4 h-auto"
          >
            <About />
            <Skills />
          </section>
          <TimelineTree />
          <Projects />
          <Contact />
        </div>
      </main>

      <Footer />
      <Toaster />
    </>
  );
}
