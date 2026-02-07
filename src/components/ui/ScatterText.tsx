import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScatterTextProps {
    children: string;
    className?: string;
}

export const ScatterText = ({ children, className }: ScatterTextProps) => {
    const letters = children.split("");

    const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;
        const spans = target.querySelectorAll("span.char");

        spans.forEach((span) => {
            const element = span as HTMLElement;
            // Random translation and rotation
            const x = (Math.random() - 0.5) * 30; // Move up to 15px
            const y = (Math.random() - 0.5) * 30;
            const rotate = (Math.random() - 0.5) * 45; // Rotate up to 22.5deg

            element.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
            element.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;
        const spans = target.querySelectorAll("span.char");

        spans.forEach((span) => {
            const element = span as HTMLElement;
            element.style.transform = "translate(0, 0) rotate(0deg)";
            element.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
        });
    };

    return (
        <span
            className={cn("inline-block cursor-default select-none", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {letters.map((char, index) => (
                <span
                    key={index}
                    className="char inline-block"
                    style={{
                        transition: "transform 0.3s ease-out",
                        willChange: "transform"
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
};
