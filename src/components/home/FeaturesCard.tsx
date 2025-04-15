import type { FC } from "react";
import type { Feature } from "@/interfaces/data.interfaces";

export const FeatureCard: FC<{ feature: Feature }> = ({ feature }) => {
    return (
        <article className="group relative min-h-[260px] transform-gpu cursor-pointer overflow-hidden rounded-2xl 
            border bg-card p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
        >
            {/* Diseño del Icono */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br 
                from-primary/20 to-primary/10 text-primary shadow-lg shadow-primary/10"
            >
                <feature.icon className="h-8 w-8" />
            </div>
            
            {/* Titulo del articulo */}
            <h3 className="mb-3 text-2xl font-bold">
                { feature.title }
            </h3>
            
            {/* Descripciónn del articulo */}
            <p className="text-muted-foreground">
                { feature.description }
            </p>

            {/* Efecto de fondo del articulo */}
            <span className="absolute bottom-0 left-0 right-0 h-32 lg:translate-y-full transform-gpu bg-gradient-to-t 
                from-primary/10 to-transparent opacity-100 lg:opacity-0 transition-all duration-500 group-hover:translate-y-0 
                group-hover:opacity-100" 
            />
        </article>
    )
}