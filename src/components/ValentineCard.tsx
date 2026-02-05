import { useState } from "react";
import { ValentineButtons } from "./ValentineButtons";
import { SuccessMessage } from "./SuccessMessage";

export const ValentineCard = () => {
  const [accepted, setAccepted] = useState(false);

  if (accepted) {
    return <SuccessMessage />;
  }

  return (
    <div className="text-center px-4">
      {/* Decorative hearts */}
      <div className="flex justify-center gap-3 mb-6 text-2xl sm:text-3xl opacity-80">
        <span className="animate-pulse" style={{ animationDelay: "0s" }}>💕</span>
        <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>💗</span>
        <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>💕</span>
      </div>
      
      {/* Main question */}
      <h1 className="font-dancing text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary mb-2 leading-tight">
        Will you be
      </h1>
      <h1 className="font-dancing text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gradient-romantic mb-8 leading-tight">
        my Val?
      </h1>
      
      {/* Cute subtitle */}
      <p className="font-quicksand text-muted-foreground text-lg sm:text-xl mb-2">
        Please say yes... 🥺
      </p>
      
      {/* Buttons */}
      <ValentineButtons onYesClick={() => setAccepted(true)} />
      
      {/* Hint text */}
      <p className="font-quicksand text-muted-foreground/60 text-sm mt-12 italic">
        (The No button might be a little... stubborn 😉)
      </p>
    </div>
  );
};
