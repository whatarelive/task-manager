import clsx from "clsx";
import { Star } from "lucide-react";

import type { FC } from "react";
import type { Opinions } from "@/interfaces/data.interfaces";

interface Props {
    opinion: Opinions;
    color: string;
}

export const OpinionsCard: FC<Props> = ({ opinion, color }) => {
    return (
        <article className="group relative overflow-hidden rounded-2xl border bg-card p-1 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            {/* Animación del efecto hover */}
            <span className={clsx(
                    `absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100`,
                    {
                        "from-primary/20 to-purple-500/20" : color === "primary",
                        "from-cyan-500/20 to-blue-500/20" : color === "cyan",
                        "from-amber-500/20 to-orange-500/20" : color === "amber",
                        "from-green-500/20 to-emerald-500/20" : color === "green",
                        "from-red-500/20 to-pink-500/20" : color === "red",
                        "from-purple-500/20 to-indigo-500/20" : color === "purple",
                    }
                )} 
            />
            
            {/* Contenido */}
            <div className="relative h-full rounded-xl bg-card p-6">
                <div className="mb-4 flex items-center gap-4">
                    {/* Imagen del usuario */}
                    <picture className="h-16 w-16 overflow-hidden rounded-full border-2 shadow-sm">
                        <img
                            src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${opinion.name}`}
                            alt="Foto de perfil"
                            className="h-full w-full object-cover"
                        />
                    </picture>

                    {/* Datos del usuario */}
                    <div>
                        <h4 className="text-lg font-bold">
                            { opinion.name }
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            { opinion.job }    
                        </p>
                    </div>

                    {/* Valoración del usuario */}
                    <ul className="ml-auto flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <li key={index}>
                                <Star className={`h-5 w-5 ${ opinion.valoration >= index+1 ? "fill-current" : "" }`} />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Opinión del usuario */}
                <p className="italic text-muted-foreground">
                    "{ opinion.opinion }"
                </p>
            </div>
        </article>
    )
}
