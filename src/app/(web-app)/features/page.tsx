import { BarChart4, Bell, Calendar, CheckCircle, Sparkles, Tag, Lock } from "lucide-react";
import { Snowfall } from "@/components/global/Snowfall";
import { Background } from "@/components/global/Background";
import { FeatureDetailCard } from "@/components/features/FeatureDetailCard";
import type { FeatureDetail } from "@/interfaces/data.interfaces";

// Arreglo de características detalladas
const features: FeatureDetail[] = [
    {
        icon: CheckCircle,
        title: "Gestión de tareas",
        description: "Crea, edita y organiza tus tareas de manera intuitiva. Mantén todo en un solo lugar.",
        details: ["Crea tareas con títulos descriptivos", "Marca tareas como completadas", "Edita o elimina tareas fácilmente"],
        color: "primary"
    },
    {
        icon: Tag,
        title: "Etiquetas personalizadas",
        description: "Asigna etiquetas de colores para categorizar y filtrar tus tareas según tus necesidades.",
        details: ["Crea etiquetas con nombres y colores personalizados", "Asigna múltiples etiquetas a una tarea", "Filtra tareas por etiquetas específicas"],
        color: "cyan-500"
    },
    {
        icon: Calendar,
        title: "Fechas límite",
        description: "Establece fechas de vencimiento para tus tareas y mantén un seguimiento de los plazos.",
        details: ["Asigna fechas límite a tus tareas", "Visualiza tareas ordenadas por fecha", "Recibe recordatorios de tareas próximas a vencer"],
        color: "amber-500"
    },
    {
        icon: BarChart4,
        title: "Estadísticas y progreso",
        description: "Visualiza tu productividad con estadísticas claras sobre tus tareas completadas.",
        details: ["Visualiza el porcentaje de tareas completadas", "Analiza tu productividad por día, semana o mes", "Identifica patrones para mejorar tu eficiencia"],
        color: "green-500"
    },
    {
        icon: Bell,
        title: "Notificaciones",
        description: "Recibe alertas sobre tareas próximas a vencer para nunca perder un plazo importante.",
        details: ["Configura recordatorios personalizados", "Recibe notificaciones por correo electrónico", "Ajusta la frecuencia de las notificaciones"],
        color: "red-500"
    },
    {
        icon: Lock,
        title: "Espacios de trabajo",
        description: "Colabora con tu equipo en espacios compartidos y asigna tareas a los miembros.",
        details: ["Crea espacios para diferentes proyectos", "Invita miembros y asigna roles", "Asigna tareas a miembros específicos"],
        color: "purple-500"
    },
]

export default function FeaturesPage() {
    return (
        <>
            {/* Fondo con colotes animados */}
            <Background/>
        
            {/* Animación de particulas */}
            <Snowfall cant={50}/>

            {/* Listado de características detalladas */}
            <section className="relative overflow-hidden px-4 py-24">
                <div className="container mx-auto relative z-10">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                            Todas las herramientas que necesitas
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Descubre cómo TaskMaster puede ayudarte a ser más productivo
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        { features.map((feature, index) => <FeatureDetailCard key={index} feature={feature}/>) }
                    </div>
                </div>
            </section>
        </>
    )
}
