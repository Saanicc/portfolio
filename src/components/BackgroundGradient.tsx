import { cn } from "@/lib/utils";
import { StarsBackground } from "./animate-ui/components/backgrounds/stars";

export const BackgroundGradient = () => {
  return (
    <div className="fixed min-h-dvh -z-10 w-full h-full">
      <StarsBackground
        speed={150}
        starColor="#FFFFFF80"
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-xl",
          "bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,hsl(var(--accent))_100%)]",
        )}
      />
    </div>
  );
};
