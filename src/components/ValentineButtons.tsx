import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MagneticWrapper } from "./ui/MagneticWrapper";

interface ValentineButtonsProps {
  onYesClick: () => void;
}

export const ValentineButtons = ({ onYesClick }: ValentineButtonsProps) => {
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [noPosition, setNoPosition] = useState<{ top: number; left: number } | null>(null);
  const [rotation, setRotation] = useState(0);
  const [yesStrength, setYesStrength] = useState(0.35);
  // Add a click/hover count to ramp up the tilt/slant
  const [interactionCount, setInteractionCount] = useState(0);

  const handleNoInteraction = () => {
    setInteractionCount((prev) => prev + 1);

    // Increase Yes button size
    setYesScale((prev) => Math.min(prev + 0.15, 2.5));

    // Increase Magnetic Strength of Yes button
    setYesStrength((prev) => Math.min(prev + 0.15, 2)); // Cap at 2x movement

    // Shrink No button
    setNoScale((prev) => Math.max(prev * 0.9, 0.3)); // Shrink by 10% each time

    // Move No button to random FIXED position on screen
    // We used window.innerWidth/Height - button dimensions (approx 100px)
    const maxWidth = window.innerWidth - 100;
    const maxHeight = window.innerHeight - 50;

    const randomX = Math.random() * maxWidth;
    const randomY = Math.random() * maxHeight;

    setNoPosition({ left: randomX, top: randomY });

    // Add random rotation (slant) that gets more extreme
    const maxRotation = Math.min(interactionCount * 15, 180); // Cap at 180deg
    const randomRotate = (Math.random() - 0.5) * maxRotation;
    setRotation(randomRotate);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 relative min-h-[120px]">
      <MagneticWrapper strength={yesStrength}>
        <Button
          onClick={onYesClick}
          className={cn(
            "bg-gradient-romantic text-primary-foreground font-quicksand font-semibold",
            "px-8 py-6 text-lg sm:text-xl rounded-full",
            "shadow-button hover:shadow-glow",
            "transition-all duration-300 ease-out",
            "hover:brightness-110 active:scale-95",
            "min-w-[140px] touch-manipulation z-10"
          )}
          style={{
            transform: `scale(${yesScale})`,
            transformOrigin: "center",
          }}
        >
          Yes ❤️
        </Button>
      </MagneticWrapper>

      <Button
        onMouseEnter={handleNoInteraction}
        onClick={handleNoInteraction} // Fallback for touch devices
        variant="outline"
        className={cn(
          "border-2 border-muted-foreground/30 text-muted-foreground",
          "font-quicksand font-medium",
          "px-6 py-5 text-base sm:text-lg rounded-full",
          "hover:border-muted-foreground/50 hover:text-muted-foreground",
          "transition-all duration-300 ease-out",
          "active:scale-95 touch-manipulation",
          "bg-card/80 backdrop-blur-sm",
          noPosition ? "fixed z-50 transition-all duration-300" : "relative"
        )}
        style={{
          left: noPosition ? noPosition.left : "auto",
          top: noPosition ? noPosition.top : "auto",
          transform: `scale(${noScale}) rotate(${rotation}deg)`,
          transformOrigin: "center",
        }}
      >
        No 💔
      </Button>
    </div>
  );
};
