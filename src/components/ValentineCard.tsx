import { useState } from "react";
import { ValentineButtons } from "./ValentineButtons";
import { SuccessMessage } from "./SuccessMessage";
import { ValentineForm } from "./ValentineForm";
import { ScatterText } from "./ui/ScatterText";
import { HeartfeltMessage } from "./HeartfeltMessage";
import mascotCute from "@/assets/mascot-cute.png";

type Step = "question" | "message" | "form" | "success";

export const ValentineCard = () => {
  const [step, setStep] = useState<Step>("question");

  if (step === "success") {
    return <SuccessMessage />;
  }

  if (step === "message") {
    return <HeartfeltMessage onContinue={() => setStep("form")} onBack={() => setStep("question")} />;
  }

  if (step === "form") {
    return (
      <ValentineForm
        onSend={() => setStep("success")}
        onBack={() => setStep("question")}
      />
    );
  }

  return (
    <div className="text-center px-4">
      {/* Cute minion */}
      <div className="flex justify-center mb-4">
        <img
          src={mascotCute}
          alt="Cute mascot"
          className="w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-lg"
        />
      </div>

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
      <h1 className="font-dancing text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-romantic mb-8 leading-tight flex justify-center">
        <ScatterText>my Val?</ScatterText>
      </h1>

      {/* Cute subtitle */}
      <p className="font-quicksand text-muted-foreground text-lg sm:text-xl mb-2">
        Please say yes... 🥺
      </p>

      {/* Buttons */}
      <ValentineButtons onYesClick={() => setStep("message")} />

      {/* Hint text */}
      <p className="font-quicksand text-muted-foreground/60 text-sm mt-12 italic">
        (The No button might be a little... stubborn 😉)
      </p>
    </div>
  );
};
