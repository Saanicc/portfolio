import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";

interface HeroProps {
  scrollToAbout: () => void;
}

export default function Hero({ scrollToAbout }: HeroProps) {
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

  useGSAP(() => {
    gsap.fromTo(
      ".header",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: "power1.inOut" }
    );

    gsap.fromTo(
      ".info-text",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, delay: 0.25, duration: 1, ease: "power1.inOut" }
    );

    gsap.fromTo(
      "#chevron",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        delay: 1.25,
        duration: 0.5,
        ease: "power1.inOut",
      }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 250 && isVisible) {
        gsap.to("#chevron", {
          opacity: 0,
          duration: 0.25,
          ease: "power1.out",
          pointerEvents: "none",
        });
        setIsVisible(false);
      } else if (scrollY <= 250 && !isVisible) {
        gsap.to("#chevron", {
          opacity: 1,
          duration: 0.25,
          ease: "power1.out",
          pointerEvents: "auto",
        });
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh min-w-screen relative">
      <div className="flex flex-col items-center">
        <h1 className="header text-4xl font-bold text-wrap max-w-2xl mx-auto text-center text-white">
          Hi, I am
          <br />
          <span className="text-3xl bg-gradient-to-r from-accent via-gray-100 to-accent text-transparent bg-clip-text bg-[length:200%_100%]">
            <span className="typing-text">{displayText}</span>
            <span className="cursor text-white animate-blink">|</span>
          </span>
        </h1>
        <p className="info-text text-lg text-white mt-6 text-center max-w-2xl">
          I specialize in creating seamless user experiences for web and mobile
          applications using React and React Native. Passionate about building
          intuitive, responsive interfaces that users love.
        </p>
      </div>
      <Button
        id="chevron"
        variant="ghost"
        onClick={scrollToAbout}
        className="absolute bottom-10 sm:container mt-5 hover:bg-transparent flex flex-col items-center justify-center gap-0 p-0 h-fit max-w-12"
      >
        <ChevronDown className="min-h-4 min-w-4 text-white animate-bounce [animation-delay:1000ms]" />
        <ChevronDown className="min-h-5 min-w-5 text-white animate-bounce [animation-delay:1150ms]" />
        <ChevronDown className="min-h-6 min-w-6 text-white animate-bounce [animation-delay:1300ms]" />
      </Button>
    </div>
  );
}
