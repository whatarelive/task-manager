import clsx from "clsx";
import type { FC } from "react";

interface Props {
    cant: number;
    type: "Snow" | "Particle";
}

export const AnimateParticle: FC<Props> = ({ cant, type }) => (
    <div className={clsx(
            "inset-0 overflow-hidden",
            {
                "pointer-events-none fixed z-0" : type === "Snow",
                "absolute" : type === "Particle"
            }
        )}
    >
        {Array.from({ length: cant }).map((_, i) => (
            <span
                key={i}
                className={clsx(
                    "w-2 fixed h-2 rounded-full",
                    {
                        "-top-2 bg-cyan-300/80 fall" : type === "Snow",
                        "bg-white/30" : type === "Particle"
                    }
                )}
                style={{
                    top: type === "Particle" ? `${Math.random() * 100}%` : "",
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.3,
                    animation: type === "Particle" ? `float ${Math.random() * 10 + 10}s linear infinite` : "",
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${5 + Math.random() * 5}s`,
                }}
            />
        ))}
    </div>
)
