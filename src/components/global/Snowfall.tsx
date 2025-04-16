import type { FC } from "react";

export const Snowfall: FC<{ cant: number }> = ({ cant }) => (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {Array.from({ length: cant }).map((_, i) => (
            <span
                key={i}
                className="absolute w-2 h-2 top-0 bg-cyan-300 rounded-full opacity-80 fall"
                style={{
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.3,
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${5 + Math.random() * 5}s`,
                }}
            />
        ))}
    </div>
)
