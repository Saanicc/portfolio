"use client";

import Nav from "@/components/Nav";
import Projects from "@/components/Projects/Projects";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills/Skills";
import Contact from "@/components/Contact";
import About from "@/components/About";
import { Toaster } from "@/components/ui/toaster";
import TimelineTree from "@/components/Timeline/TimelineTree";
import Footer from "@/components/Footer";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import AnimationWrapper from "@/components/AnimationWrapper";

export default function Home() {
  return (
    <>
      <BackgroundGradient />
      <Nav />
      <main className="flex flex-col items-center overflow-hidden">
        <div className="flex flex-col items-center justify-center px-4 md:max-w-4xl lg:max-w-screen-xl gap-20">
          <Hero />
          <section
            id="about"
            className="w-full min-w-full md:px-0 h-auto min-h-96"
          >
            <AnimationWrapper
              transitionDuration={0.5}
              viewportAmount={0.1}
              className="flex flex-col sm:flex-row gap-4"
            >
              <About />
              <Skills />
            </AnimationWrapper>
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
