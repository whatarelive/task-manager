import Link from "next/link";
import { ArrowRight, CheckCircle, ListTodo, Settings, Sparkles, Star, Tag, Users, Wallpaper } from "lucide-react";
import { LinkButton } from "@/components/global/LinkButton";
import { Background } from "@/components/global/Background";
import { AnimateParticle } from "@/components/global/AnimateParticle";
import { ReasonsCard } from "@/components/home/ReasonsCard";
import { FeatureCard } from "@/components/home/FeaturesCard";
import { OpinionsCard } from "@/components/home/OpinionsCard";
import { DashBoardPreview } from "@/components/home/DashboardPreview";

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
            <AnimateParticle cant={50} type="Snow"/>

            {/* Sección principal */}
            <section className="relative overflow-hidden px-3 py-20 md:py-32 z-30">
                <div className="container mx-auto relative">
                    <div className="mx-auto max-w-4xl text-center">
                        {/* Etiqueta decorativa */}
                        <div className="group mb-6 inline-flex animate-shimmer items-center gap-2 rounded-full bg-gradient-to-r 
                            from-primary/20 via-primary/40 to-primary/20 px-5 py-2 text-sm font-medium text-primary backdrop-blur-sm"
                        >
                            <Sparkles className="h-4 w-4" />
                            <span>Gestión de tareas reimaginada</span>
                        </div>

                        {/* Frase principal de la página */}
                        <h2 className="mb-6 animate-gradient-text bg-gradient-to-r from-primary via-purple-600 to-primary bg-300% 
                            bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl md:text-6xl"
                        >
                            Organiza tus tareas de manera simple y efectiva
                        </h2>

                        {/* Descripción de la página */}
                        <p className="mx-auto mb-10 max-w-2xl text-xl text-muted-foreground">
                            TaskMaster te ayuda a gestionar tus tareas diarias, establecer fechas límite y mantener todo organizado
                            en un solo lugar. Colabora con tu equipo en espacios de trabajo compartidos.
                        </p>

                        {/* Links de Registro y sección de caracteristicas */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <LinkButton href="/register" label="Comenzar ahora" icon />
                        
                            <Link 
                                href="#features"
                                className="group relative overflow-hidden rounded-full border-2 px-8 py-2 text-lg shadow-sm transition-all 
                                duration-300 hover:border-primary/50 hover:shadow-md"
                            >
                                <span className="relative z-20 group-hover:text-primary/50">Conocer más</span>
                                <span className="absolute inset-0 -z-10 translate-y-[105%] rounded-full bg-primary/10 transition-transform 
                                    duration-300 group-hover:translate-y-0"/>
                            </Link>
                        </div>
                    </div>

                    {/* Vista previa del Dashboard */}
                    <DashBoardPreview/>
                </div>
            </section>

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

            {/* Sección de CTA */}
            <section className="container mx-auto px-4 py-20">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-purple-600 p-8 shadow-xl md:p-16">
                    {/* Decoración de brillo en los extremos */}
                    <span className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
                    <span className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />

                    {/* Animación de Particulas */}
                    <AnimateParticle cant={30} type="Particle"/>

                    {/* Contenido */}
                    <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
                        {/* Titulo de la sección */}
                        <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
                            Comienza a organizar tus tareas hoy mismo
                        </h2>
                        
                        {/* Descripción de la sección */}
                        <p className="mb-10 text-xl text-white/80">
                            Únete a miles de personas y equipos que ya están mejorando su productividad con TaskMaster. Regístrate
                            gratis y descubre cómo podemos ayudarte.
                        </p>

                        {/* Enlaces de navegación */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link 
                                href="/register"
                                className="group relative overflow-hidden rounded-full bg-white px-8 py-3 text-lg font-bold 
                                text-primary shadow-lg transition-all duration-300 hover:bg-white/90 hover:shadow-xl"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Crear cuenta gratis
                                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"/>
                                </span>
                            </Link>
                            <Link 
                                href="/login"
                                className="group relative overflow-hidden rounded-full border-2 border-white/50 bg-transparent 
                                px-8 py-2.5 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-white/10 
                                hover:shadow-xl"
                            >
                                <span className="relative z-10">Iniciar sesión</span>
                                <span className="absolute inset-0 -z-10 translate-y-[105%] rounded-full bg-white/10 transition-transform 
                                    duration-300 group-hover:translate-y-0" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
