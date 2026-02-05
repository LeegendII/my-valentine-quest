import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ValentineButtonsProps {
  onYesClick: () => void;
}

export const ValentineButtons = ({ onYesClick }: ValentineButtonsProps) => {
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isWiggling, setIsWiggling] = useState(false);

  const handleNoClick = () => {
    // Increase Yes button size
    setYesScale((prev) => Math.min(prev + 0.25, 3));
    
    // Shrink No button slightly
    setNoScale((prev) => Math.max(prev - 0.05, 0.6));
    
    // Move No button randomly
    const randomX = (Math.random() - 0.5) * 100;
    const randomY = (Math.random() - 0.5) * 50;
    setNoPosition({ x: randomX, y: randomY });
    
    // Trigger wiggle animation
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 relative min-h-[120px]">
      <Button
        onClick={onYesClick}
        className={cn(
          "bg-gradient-romantic text-primary-foreground font-quicksand font-semibold",
          "px-8 py-6 text-lg sm:text-xl rounded-full",
          "shadow-button hover:shadow-glow",
          "transition-all duration-300 ease-out",
          "hover:brightness-110 active:scale-95",
          "min-w-[140px] touch-manipulation",
          isWiggling && "animate-wiggle animate-pulse-glow"
        )}
        style={{
          transform: `scale(${yesScale})`,
          transformOrigin: "center",
        }}
      >
        Yes ❤️
      </Button>
      
      <Button
        onClick={handleNoClick}
        variant="outline"
        className={cn(
          "border-2 border-muted-foreground/30 text-muted-foreground",
          "font-quicksand font-medium",
          "px-6 py-5 text-base sm:text-lg rounded-full",
          "hover:border-primary/50 hover:text-primary",
          "transition-all duration-300 ease-out",
          "active:scale-95 touch-manipulation",
          "bg-card/80 backdrop-blur-sm"
        )}
        style={{
          transform: `scale(${noScale}) translate(${noPosition.x}px, ${noPosition.y}px)`,
          transformOrigin: "center",
        }}
      >
        No 💔
      </Button>
    </div>
  );
};
