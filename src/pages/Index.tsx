import { ValentineCard } from "@/components/ValentineCard";
import { Preloader } from "@/components/ui/Preloader";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 overflow-hidden">
      <Preloader />
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating background hearts */}
        <div className="absolute top-10 left-10 text-4xl opacity-10 animate-pulse">💕</div>
        <div className="absolute top-20 right-20 text-3xl opacity-10 animate-pulse" style={{ animationDelay: "1s" }}>💗</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-10 animate-pulse" style={{ animationDelay: "0.5s" }}>💖</div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-10 animate-pulse" style={{ animationDelay: "1.5s" }}>💝</div>
        <div className="absolute top-1/3 left-5 text-2xl opacity-10 animate-pulse" style={{ animationDelay: "0.8s" }}>💓</div>
        <div className="absolute top-1/2 right-8 text-3xl opacity-10 animate-pulse" style={{ animationDelay: "1.2s" }}>💞</div>
      </div>

      {/* Main content */}
      <main className="relative z-10 w-full max-w-2xl mx-auto">
        <ValentineCard />
      </main>
    </div>
  );
};

export default Index;
