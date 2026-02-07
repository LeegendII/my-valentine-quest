import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setLoading(false), 500); // Wait a bit after 100%
                    return 100;
                }
                return prev + 2; // Increment speed
            });
        }, 20);

        return () => clearInterval(timer);
    }, []);

    if (!loading) return null;

    return (
        <div className={cn(
            "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-1000",
            progress === 100 && "pointer-events-none"
        )}
            style={{ opacity: progress === 100 ? 0 : 1 }}
        >
            <div className="text-6xl animate-pulse mb-8">💖</div>
            <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="mt-4 font-dancing text-2xl text-primary animate-bounce">
                Preparing your quest... {progress}%
            </p>
        </div>
    );
};
