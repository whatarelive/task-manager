import { CheckCircle, ListTodo, Settings, Sparkles, Star, Tag, Users, Wallpaper } from "lucide-react";
import { HeroView } from "@/components/home/HeroView";
import { Snowfall } from "@/components/global/Snowfall";
import { LinkButton } from "@/components/global/LinkButton";
import { Background } from "@/components/global/Background";
import { ReasonsCard } from "@/components/home/ReasonsCard";
import { OpinionsCard } from "@/components/home/OpinionsCard";
import { FeatureCard } from "@/components/home/FeaturesCard";
import { LastSection } from "@/components/home/das";

// JSON con las opiniones
import opinions from "@/lib/data/opinions.json";

// Colores de la animación de las tarjetas de opiniones
const colors: string[] = ["primary", "cyan", "amber", "green", "red", "purple"];

export default function Home() {
    return (
        <>
            {/* Fondo con colotes animados */}
            <Background/>
    
            {/* Animación de particulas */}
            <Snowfall cant={50}/>

            {/* Sección principal */}
            <HeroView/>

            {/* Sección con la razones porque usar la plataforma */}
            <section className="container mx-auto px-4 py-24 md:py-32">
                {/* Titulo de la Sección */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Star className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                        ¿Por qué elegir TaskMaster?
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Una solución completa para la gestión de tareas personales y de equipo
                    </p>
                </div>

                {/* Listado de razones */}
                <div className="grid gap-8 md:grid-cols-3">
                    <ReasonsCard
                        title="Simple"
                        description="Interfaz intuitiva diseñada para facilitar la gestión de tareas sin complicaciones. Comienza a organizar tu trabajo en minutos."
                        color="primary" gradient="rgba(34, 150, 200, 0.3)"
                        children={ <Settings className="w-11 h-11"/> }
                    />
                    <ReasonsCard
                        title="Colaborativo"
                        description="Trabaja con tu equipo en tiempo real, asigna tareas y mantén a todos sincronizados para alcanzar objetivos comunes."
                        color="cyan-500" gradient="rgba(34, 211, 238, 0.3)"
                        children={ <Users className="w-11 h-11"/> }
                    />
                    <ReasonsCard
                        title="Personalizable"
                        description="Interfaz intuitiva diseñada para facilitar la gestión de tareas sin complicaciones. Comienza a organizar tu trabajo en minutos."
                        color="purple-500" gradient="rgba(168, 85, 247, 0.3)"
                        children={ <Wallpaper className="w-11 h-11"/> }
                    />
                </div>
            </section>
            
            {/* Sección con las características principales */}
            <section id="features" className="container mx-auto flex flex-col items-center px-4 py-24 md:py-32">
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
                    <FeatureCard 
                        title="Gestión de tareas" 
                        description="Crea, edita y organiza tus tareas de manera intuitiva. Mantén todo en un solo lugar con una interfaz diseñada para maximizar tu productividad."
                        children={ <ListTodo className="h-8 w-8"/> }    
                    />
                    <FeatureCard 
                        title="Etiquetas personalizadas" 
                        description="Asigna etiquetas de colores para categorizar y filtrar tus tareas según tus necesidades, creando un sistema visual que facilita la organización."
                        children={ <Tag className="h-8 w-8"/> }    
                    />
                    <FeatureCard 
                        title="Seguimiento de progreso" 
                        description="Marca tareas como completadas y visualiza tu progreso con estadísticas claras y motivadoras que te ayudan a mantener el impulso."
                        children={ <CheckCircle className="h-8 w-8"/> }    
                    />
                </div>

                {/* Enlace a la página con todas las características */}
                <LinkButton href="/features" label="Ver más caracterísitcas" icon/>
            </section>

            {/* Sección de Opiniones */}
            <section className="relative overflow-hidden px-4 py-24 md:py-32">
                <div className="container flex flex-col items-center mx-auto relative z-10">
                    {/* Titulo de la Sección */}
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Star className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                            Lo que dicen nuestros usuarios
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Descubre cómo TaskMaster está transformando la forma en que las personas y equipos gestionan sus tareas
                        </p>
                    </div>

                    {/* Listado de opiniones */}
                    <div className="grid mb-16 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {opinions.opinions.map((opinion, index) => (
                            <OpinionsCard key={index} opinion={opinion} color={colors[index]} />
                        ))}
                    </div>

                    {/* Enlace a la página de registro */}
                    <LinkButton href="/auth" label="Unete a ellos" icon/>
                </div>
            </section>

            <LastSection/>
        </>
    )
}
