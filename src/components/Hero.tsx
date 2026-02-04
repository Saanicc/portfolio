import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useScrollTo } from "@/hooks/useScrollTo";
import AnimationWrapper from "./AnimationWrapper";

export default function Hero() {
  const { scrollToSection } = useScrollTo();
  const [isVisible, setIsVisible] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const typingSpeed = useRef(1000);
  const pauseDuration = 1500;

  useEffect(() => {
    const typeText = () => {
      const phrases = ["Mattias Ahlström", "a Frontend Developer"];
      const currentPhrase = phrases[phraseIndex.current];

      if (isDeleting.current) {
        setDisplayText(currentPhrase.substring(0, charIndex.current - 1));
        charIndex.current -= 1;
        typingSpeed.current = 30;

        if (charIndex.current <= 0) {
          isDeleting.current = false;
          phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
          typingSpeed.current = 100;
          setTimeout(typeText, 500);
          return;
        }
      } else {
        setDisplayText(currentPhrase.substring(0, charIndex.current + 1));
        charIndex.current += 1;
        typingSpeed.current = 100;

        if (charIndex.current >= currentPhrase.length) {
          isDeleting.current = true;
          setTimeout(typeText, pauseDuration);
          return;
        }
      }

      setTimeout(typeText, typingSpeed.current);
    };

    setTimeout(typeText, 1500);

    return () => {
      charIndex.current = 0;
      isDeleting.current = false;
      phraseIndex.current = 0;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 250 && isVisible) {
        setIsVisible(false);
      } else if (scrollY <= 250 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh min-w-screen relative">
      <div className="flex flex-col items-center">
        <AnimationWrapper transitionDuration={1} viewportMargin="0px">
          <h1 className="header text-4xl font-bold text-wrap max-w-2xl mx-auto text-center text-white">
            Hello, I am
            <br />
            <span className="text-3xl bg-gradient-to-r from-accent via-gray-100 to-accent text-transparent bg-clip-text bg-[length:200%_100%]">
              <span className="typing-text">{displayText}</span>
              <span className="cursor text-white animate-blink">|</span>
            </span>
          </h1>
        </AnimationWrapper>
        <AnimationWrapper
          transitionDuration={1}
          delay={0.5}
          viewportMargin="0px"
        >
          <p className="info-text text-lg text-white mt-6 text-center max-w-2xl">
            I build smooth, user-friendly experiences for web and mobile using
            React and React Native. I’m passionate about crafting intuitive,
            responsive interfaces that feel great to use.
          </p>
        </AnimationWrapper>
      </div>
      <AnimationWrapper
        delay={1}
        transitionDuration={0.5}
        viewportMargin="0px"
        className="absolute bottom-20 sm:bottom-2"
      >
        <Button
          id="chevron"
          variant="ghost"
          onClick={() => scrollToSection("about")}
          className={`sm:container mt-5 hover:bg-transparent flex flex-col items-center justify-center gap-0 p-0 h-fit max-w-12 transition-all duration-300 ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronDown className="min-h-4 min-w-4 text-white animate-bounce [animation-delay:1000ms]" />
          <ChevronDown className="min-h-5 min-w-5 text-white animate-bounce [animation-delay:1150ms]" />
          <ChevronDown className="min-h-6 min-w-6 text-white animate-bounce [animation-delay:1300ms]" />
        </Button>
      </AnimationWrapper>
    </div>
  );
}
