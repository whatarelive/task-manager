import type { FC } from "react";

interface Props {
    title: string;
    description: string, 
    color: string; 
    gradient: string;
    children?: React.ReactNode
}

export const ReasonsCard: FC<Props> = ({ children, title, description, color, gradient }) => {
    return (
        <article className="group relative overflow-hidden rounded-2xl border bg-card p-8 text-center shadow-lg 
            transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
        >
            <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-${color}/5 opacity-70 transition-all 
            duration-500 group-hover:bg-${color}/10 group-hover:opacity-100`} />
            
            <div className="relative z-10">
                <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br 
                    from-${color}/20 to-${color}/5 text-${color} shadow-lg shadow-${color}/10`}
                >
                    { children }
                </div>

                <h3 className="mb-3 text-2xl font-bold transition-transform duration-500 group-hover:-translate-y-1">
                    { title }
                </h3>
                
                <p className="text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1">
                    { description }
                </p>
            </div>

              {/* Animated border on hover */}
              <div
                    className="absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${gradient}, transparent)`,
                        backgroundSize: "200% 100%",
                        animation: "shimmer 2s infinite",
                    }}
              />
        </article>
    )
}
