import { FloatingHearts } from "./FloatingHearts";
import { Confetti } from "./Confetti";

export const SuccessMessage = () => {
  return (
    <>
      <FloatingHearts count={30} />
      <Confetti count={60} />
      
      <div className="text-center animate-bounce-in">
        <div className="text-6xl sm:text-8xl mb-6">💕</div>
        
        <h2 className="font-dancing text-4xl sm:text-6xl md:text-7xl text-primary mb-4">
          Yay!!!
        </h2>
        
        <p className="font-quicksand text-lg sm:text-xl md:text-2xl text-foreground/80 mb-6 max-w-md mx-auto px-4">
          I knew you'd say yes! You've made me the happiest person ever!
        </p>
        
        <div className="flex justify-center gap-2 text-3xl sm:text-4xl animate-pulse">
          <span>💖</span>
          <span>💝</span>
          <span>💗</span>
          <span>💓</span>
          <span>💞</span>
        </div>
        
        <p className="font-dancing text-2xl sm:text-3xl text-primary mt-8">
          Forever & Always
        </p>
      </div>
    </>
  );
};
