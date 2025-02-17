import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  scrollToProjects: () => void;
}

export default function Hero({ scrollToProjects }: HeroProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-white text-wrap max-w-2xl mx-auto text-center">
        <span className="inline-block bg-gradient-to-r from-[#63e] via-gray-100 to-[#63e] text-transparent bg-clip-text bg-[length:200%_100%] animate-wave-text">
          Mattias Ahlström
        </span>
        <br />
        Frontend Developer
      </h1>
      <p className="text-lg text-white mt-6 text-center max-w-2xl">
        I specialize in creating seamless user experiences for web and mobile
        applications using React and React Native. Passionate about building
        intuitive, responsive interfaces that users love.
      </p>
      <Button
        variant="ghost"
        onClick={scrollToProjects}
        className="mt-12 hover:bg-transparent flex flex-col items-center justify-center gap-0 h-fit"
      >
        <ChevronDown className="min-h-4 min-w-4 text-white animate-bounce" />
        <ChevronDown className="min-h-5 min-w-5 text-white animate-bounce [animation-delay:150ms]" />
        <ChevronDown className="min-h-6 min-w-6 text-white animate-bounce [animation-delay:300ms]" />
      </Button>
    </div>
  );
}
