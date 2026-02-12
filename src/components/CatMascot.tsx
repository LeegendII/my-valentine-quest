import { useState, useEffect, useRef } from "react";
import catMascot from "@/assets/cat-mascot.png";

const MINI_HEARTS = ["💖", "💕", "💗", "💘", "❤️"];

interface FloatingHeart {
  id: number;
  emoji: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

export const CatMascot = () => {
  const [visible, setVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [noScale, setNoScale] = useState(1);
  const [wiggle, setWiggle] = useState(false);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>();
  const heartId = useRef(0);

  // Fade in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Ambient floating hearts around the cat
  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: FloatingHeart = {
        id: heartId.current++,
        emoji: MINI_HEARTS[Math.floor(Math.random() * MINI_HEARTS.length)],
        x: Math.random() * 80 - 40,
        y: Math.random() * -40 - 20,
        delay: 0,
        duration: 2 + Math.random() * 1.5,
        size: 10 + Math.random() * 8,
      };
      setHearts((prev) => [...prev.slice(-6), newHeart]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setShowBubble(true);
    setShowButtons(true);
    setNoScale(1);

    if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => {
      setShowBubble(false);
      setShowButtons(false);
    }, 8000);
  };

  const handleNo = () => {
    setNoScale((prev) => Math.min(prev + 0.15, 2.2));
    setWiggle(true);
    setTimeout(() => setWiggle(false), 500);
  };

  const handleYes = () => {
    setShowBubble(false);
    setShowButtons(false);
  };

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        background: "none",
        border: "none",
        boxShadow: "none",
        outline: "none",
      }}
    >
      {/* Speech bubble */}
      {showBubble && (
        <div className="absolute -top-20 right-0 animate-fade-in">
          <div
            className="font-quicksand text-sm font-semibold px-4 py-2 rounded-2xl whitespace-nowrap"
            style={{
              background: "hsl(var(--secondary))",
              color: "hsl(var(--secondary-foreground))",
              border: "none",
              boxShadow: "none",
            }}
          >
            Will you be my val? 💖
            {/* Bubble tail */}
            <div
              className="absolute -bottom-2 right-6 w-4 h-4 rotate-45"
              style={{ background: "hsl(var(--secondary))" }}
            />
          </div>

          {/* Yes / No buttons */}
          {showButtons && (
            <div className="flex justify-center gap-2 mt-3 animate-fade-in">
              <button
                onClick={handleYes}
                className={`font-quicksand font-semibold px-3 py-1 rounded-full text-xs transition-all duration-300 ${
                  wiggle ? "animate-wiggle" : ""
                }`}
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  transform: `scale(${noScale})`,
                  border: "none",
                  boxShadow: "none",
                }}
              >
                Yes 💕
              </button>
              <button
                onClick={handleNo}
                className="font-quicksand font-medium px-3 py-1 rounded-full text-xs transition-all duration-300 hover:opacity-80"
                style={{
                  background: "hsl(var(--muted))",
                  color: "hsl(var(--muted-foreground))",
                  transform: `scale(${Math.max(1 - (noScale - 1) * 0.3, 0.5)})`,
                  border: "none",
                  boxShadow: "none",
                }}
              >
                No 💔
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating hearts around cat */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="absolute animate-mascot-heart"
            style={{
              left: `calc(50% + ${heart.x}px)`,
              bottom: `calc(50% + ${Math.abs(heart.y)}px)`,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`,
              opacity: 0,
            }}
          >
            {heart.emoji}
          </span>
        ))}
      </div>

      {/* Cat mascot */}
      <button
        onClick={handleClick}
        className="relative cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 cat-idle-bounce"
        style={{
          background: "none",
          border: "none",
          boxShadow: "none",
          outline: "none",
          padding: 0,
        }}
        aria-label="Valentine cat mascot"
      >
        <img
          src={catMascot}
          alt="Valentine cat mascot"
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md"
          style={{ filter: "drop-shadow(0 2px 8px hsl(340 82% 62% / 0.3))" }}
        />
      </button>
    </div>
  );
};
