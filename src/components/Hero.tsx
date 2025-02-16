import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  scrollToProjects: () => void;
}

export default function Hero({ scrollToProjects }: HeroProps) {
  return (
    <>
      <h1 className="text-4xl font-bold text-white text-wrap max-w-2xl mx-auto text-center">
        <span className="inline-block bg-gradient-to-r from-[#63e] via-gray-100 to-[#63e] text-transparent bg-clip-text bg-[length:200%_100%] animate-wave-text">
          Mattias Ahlström
        </span>
        <br />
        Frontend Developer
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
}
