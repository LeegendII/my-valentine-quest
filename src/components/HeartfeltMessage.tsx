import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface HeartfeltMessageProps {
    onContinue: () => void;
    onBack: () => void;
}

const MESSAGES = [
    "You just made my heart skip a beat! 💖",
    "I knew we were meant to be! 🌟",
    "Best. Decision. Ever. 🥰",
    "My world just got a whole lot brighter! ☀️",
    "Can't wait to make magical memories with you! ✨"
];

export const HeartfeltMessage = ({ onContinue, onBack }: HeartfeltMessageProps) => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Select a random message on mount
        const randomIndex = Math.floor(Math.random() * MESSAGES.length);
        setMessage(MESSAGES[randomIndex]);
    }, []);

    return (
        <div className="text-center px-4 animate-fade-in relative z-10 max-w-lg mx-auto">
            {/* Back button */}
            <button
                onClick={onBack}
                className="absolute top-4 left-4 text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 font-quicksand text-sm"
            >
                <ArrowLeft className="w-4 h-4" />
                Back
            </button>

            {/* Decorative Icon */}
            <div className="text-6xl mb-6 animate-bounce">
                💌
            </div>

            {/* Message Title */}
            <h2 className="font-dancing text-4xl sm:text-5xl text-primary mb-6 leading-tight">
                Aw, sweet!
            </h2>

            {/* The Random Message */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-2 border-primary/20 mb-8 transform hover:scale-105 transition-transform duration-300">
                <p className="font-quicksand text-xl sm:text-2xl text-foreground font-medium italic">
                    "{message}"
                </p>
            </div>

            {/* Continue Button */}
            <Button
                onClick={onContinue}
                className="bg-gradient-romantic text-primary-foreground font-quicksand font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-glow"
            >
                Continue to your Quest 💘
            </Button>
        </div>
    );
};
