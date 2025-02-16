import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  scrollToProjects: () => void;
}

export default function Hero({ scrollToProjects }: HeroProps) {
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
}
