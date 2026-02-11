import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MagneticWrapper } from "./ui/MagneticWrapper";

const funnyQuestions = [
  "Why babe? 🥺",
  "Are you sure?! 😭",
  "But I made you breakfast... 🍳",
  "Even my dog said yes 🐶",
  "My mom already likes you 👩‍👦",
  "I'll share my fries 🍟",
  "But who'll laugh at my jokes? 😢",
  "I already told my plants about you 🌱",
  "Netflix won't watch itself 🎬",
  "But I learned to cook for you 👨‍🍳",
  "What if I do a backflip? 🤸",
  "I'll let you pick the movie 🎥",
  "But I already named our cat 🐱",
  "I wrote you a poem... 📝",
  "Even Siri thinks we're cute 📱",
  "But my horoscope said yes ♥️",
  "I'll carry all the groceries 💪",
  "Pretty please? 🥹",
  "What about our travel plans? ✈️",
  "I'll never steal your blanket 🛏️",
  "But who'll eat my cooking? 🍝",
  "I promise to laugh at your puns 😂",
  "My playlist is all love songs now 🎵",
  "I already picked our wedding song 💒",
  "But I bought matching socks 🧦",
];

interface ValentineButtonsProps {
  onYesClick: () => void;
}

export const ValentineButtons = ({ onYesClick }: ValentineButtonsProps) => {
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [noPosition, setNoPosition] = useState<{ top: number; left: number } | null>(null);
  const [rotation, setRotation] = useState(0);
  const [yesStrength, setYesStrength] = useState(0.35);
  const [interactionCount, setInteractionCount] = useState(0);
  const [noText, setNoText] = useState("No 💔");
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);

  const getRandomQuestion = () => {
    let available = funnyQuestions.map((_, i) => i).filter((i) => !usedQuestions.includes(i));
    if (available.length === 0) {
      setUsedQuestions([]);
      available = funnyQuestions.map((_, i) => i);
    }
    const idx = available[Math.floor(Math.random() * available.length)];
    setUsedQuestions((prev) => [...prev, idx]);
    return funnyQuestions[idx];
  };

  const handleNoInteraction = () => {
    setInteractionCount((prev) => prev + 1);
    setNoText(getRandomQuestion());

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
        {noText}
      </Button>
    </div>
  );
};
