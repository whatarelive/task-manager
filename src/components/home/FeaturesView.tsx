import Link from "next/link";
import { ArrowRight, CheckCircle, ListTodo, Sparkles, Tag } from "lucide-react";
import { FeatureCard } from "@/components/home/FeaturesCard";

import type { Feature } from "@/interfaces/data.interfaces";

// Arreglo de características principales
const features: Feature[] = [
    {
        icon: ListTodo,
        title: "Gestión de tareas",
        description: "Crea, edita y organiza tus tareas de manera intuitiva. Mantén todo en un solo lugar con una interfaz diseñada para maximizar tu productividad."
    },
    {
        icon: Tag,
        title: "Etiquetas personalizadas",
        description: "Asigna etiquetas de colores para categorizar y filtrar tus tareas según tus necesidades, creando un sistema visual que facilita la organización."
    },
    {
        icon: CheckCircle,
        title: "Seguimiento de progreso",
        description: "Marca tareas como completadas y visualiza tu progreso con estadísticas claras y motivadoras que te ayudan a mantener el impulso."
    }
]

export const FeaturesView = () => {
    return (
        <section id="feateres" className="container mx-auto flex flex-col px-4 py-24 md:py-32">
            <div className="mb-16 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h2 className="mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-3xl font-bold 
                    leading-tight text-transparent sm:text-4xl"
                >
                    Características principales
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                    Descubre cómo TaskMaster puede transformar tu productividad y la de tu equipo
                </p>
            </div>
            
            {/* Listado de características principales */}
            <div className="grid mb-16 gap-8 md:grid-cols-3">
                { features.map((feature, index) => <FeatureCard key={index} feature={feature}/> ) }
            </div>

            {/* Enlace a la página con todas las características */}
            <Link 
                href="/features" 
                className="group mx-auto relative text-white overflow-hidden rounded-full 
                bg-gradient-to-r from-primary to-purple-600 px-8 py-2 text-lg shadow-lg shadow-primary/20 transition-all 
                duration-300 hover:shadow-xl hover:shadow-primary/30"
            >
                <span className="relative flex items-center gap-2">
                    Ver más caracterísitcas
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </Link>
        </section>
    )
}
