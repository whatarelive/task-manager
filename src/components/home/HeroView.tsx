import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroView = () => {
    return (
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
                        <Link 
                            href="/register"         
                            className="group relative text-white overflow-hidden rounded-full bg-gradient-to-r from-primary 
                            to-purple-600 px-8 py-2 text-lg shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl 
                            hover:shadow-primary/30"
                        >
                            <span className="relative flex items-center gap-2">
                                Comenzar ahora
                                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                            <span 
                                className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-primary opacity-0 
                                transition-opacity duration-300 group-hover:opacity-100" 
                            />
                        </Link>

                        <Link 
                            href="#features"
                            className="group relative overflow-hidden rounded-full border-2 px-8 py-2 text-lg shadow-sm transition-all 
                            duration-300 hover:border-primary/50 hover:shadow-md"
                        >
                            <span className="relative z-20 group-hover:text-primary/50">Conocer más</span>
                            <span 
                                className="absolute inset-0 -z-10 translate-y-[105%] rounded-full bg-primary/10 transition-transform 
                                duration-300 group-hover:translate-y-0" 
                            />
                        </Link>
                    </div>
                </div>

                {/* Vista previa del Dashboard */}
                <div className="mt-16 flex justify-center">
                    <div className="relative w-fit md:w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-1 shadow-2xl backdrop-blur-md">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-30" />
                        
                        <div className="relative rounded-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                                
                            {/* Imagen del Dashboard para PCs */}
                            <Image
                                width={600}
                                height={600}
                                quality={100}
                                unoptimized
                                src="/aplication.png"
                                alt="TaskMaster Dashboard Preview"
                                className="hidden md:block w-full object-cover h-full"
                            />

                            {/* Imagen del Dashboard para móviles */}
                            <Image
                                width={300}
                                height={300}
                                quality={100}
                                unoptimized
                                src="/aplication_mobile.png"
                                alt="TaskMaster Dashboard Preview"
                                className="md:hidden block object-cover h-full"
                            />

                            {/* Elementos flotantes */}
                            <div className="absolute left-[50%] md:left-[30%] top-[8%] md:top-[28%] w-32 animate-float rounded-lg border border-white/10 bg-white/5 p-3 shadow-xl backdrop-blur-md">
                                <div className="h-2 w-20 rounded-full bg-white/60" />
                                <div className="mt-2 h-2 w-16 rounded-full bg-white/60" />
                            </div>

                            <div className=" absolute right-[5%] top-[55%] md:top-[45%] w-40 animate-float rounded-lg border border-white/20 bg-white/10 p-3 shadow-xl backdrop-blur-md [animation-delay:2s]">
                                <div className="flex items-center gap-2">
                                    <span className="h-4 w-4 rounded-full bg-green-400" />
                                    <span className="h-2 w-24 rounded-full bg-white/50" />
                                </div>
                                <div className="mt-2 h-2 w-32 rounded-full bg-white/30" />
                            </div>

                            <div className="absolute bottom-[20%] left-[10%] md:left-[45%] w-36 animate-float rounded-lg border border-white/20 bg-white/10 p-3 shadow-xl backdrop-blur-md [animation-delay:4s]">
                                <div className="flex items-center gap-2">
                                    <span className="h-4 w-4 rounded-full bg-amber-400" />
                                    <span className="h-2 w-20 rounded-full bg-white/50" />
                                </div>

                                <div className="mt-2 min-h-2 w-28 rounded-full bg-white/30" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
