import { HeroView } from "@/components/home/HeroView";
import { Snowfall } from "@/components/global/Snowfall";
import { Background } from "@/components/global/Background";
import { FeaturesView } from "@/components/home/FeaturesView";

export default function Home() {
  return (
    <>
      {/* Fondo con colotes animados */}
      <Background/>
  
      {/* Animación de particulas */}
      <Snowfall cant={50}/>

      {/* Hero Section with Parallax */}
      <HeroView/>

      {/* Features Overview with 3D Cards */}
      <FeaturesView/>


        {/* Detailed Features with Glassmorphism *

        {/* Why Choose Us Section with Animated Cards *}
        <section className="container py-24 md:py-32">
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
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 opacity-70 transition-all duration-500 group-hover:bg-primary/10 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-lg shadow-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold transition-transform duration-500 group-hover:-translate-y-1">
                  Simple
                </h3>
                <p className="text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1">
                  Interfaz intuitiva diseñada para facilitar la gestión de tareas sin complicaciones. Comienza a
                  organizar tu trabajo en minutos.
                </p>
              </div>

              {/* Animated border on hover *}
              <div
                className="absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(var(--primary), 0.3), transparent)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>

            <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/5 opacity-70 transition-all duration-500 group-hover:bg-cyan-500/10 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 text-cyan-500 shadow-lg shadow-cyan-500/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold transition-transform duration-500 group-hover:-translate-y-1">
                  Colaborativo
                </h3>
                <p className="text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1">
                  Trabaja con tu equipo en tiempo real, asigna tareas y mantén a todos sincronizados para alcanzar
                  objetivos comunes.
                </p>
              </div>

              {/* Animated border on hover *}
              <div
                className="absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.3), transparent)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>

            <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/5 opacity-70 transition-all duration-500 group-hover:bg-purple-500/10 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/5 text-purple-500 shadow-lg shadow-purple-500/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10"
                  >
                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                    <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                    <path d="M19 11h2m-1 -1v2" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold transition-transform duration-500 group-hover:-translate-y-1">
                  Personalizable
                </h3>
                <p className="text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1">
                  Adapta la plataforma a tus necesidades con etiquetas, filtros y espacios de trabajo que se ajustan a
                  tu flujo de trabajo único.
                </p>
              </div>

              {/* Animated border on hover *}
              <div
                className="absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.3), transparent)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section with Animated Cards *}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-70" />
          <div className="container relative z-10">
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

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-2xl border bg-card p-1 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative rounded-xl bg-card p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/5 shadow-sm">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Foto de perfil"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">María González</h4>
                      <p className="text-sm text-muted-foreground">Diseñadora Freelance</p>
                    </div>
                    <div className="ml-auto flex text-amber-400">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    "TaskMaster ha cambiado completamente mi forma de trabajar. Ahora puedo gestionar todos mis
                    proyectos freelance en un solo lugar, establecer prioridades y nunca perder una fecha límite. ¡Es
                    exactamente lo que necesitaba!"
                  </p>

                  {/* Animated quote marks *}
                  <div className="absolute -left-2 -top-2 text-4xl text-primary/10 transition-all duration-500 group-hover:text-primary/20">
                    "
                  </div>
                  <div className="absolute -bottom-5 -right-2 text-4xl text-primary/10 transition-all duration-500 group-hover:text-primary/20">
                    "
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border bg-card p-1 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative rounded-xl bg-card p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-cyan-500/20 bg-cyan-500/5 shadow-sm">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Foto de perfil"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Carlos Rodríguez</h4>
                      <p className="text-sm text-muted-foreground">Director de Proyecto, TechSolutions</p>
                    </div>
                    <div className="ml-auto flex text-amber-400">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    "Los espacios de trabajo compartidos han revolucionado la forma en que nuestro equipo colabora.
                    Podemos asignar tareas, hacer seguimiento del progreso y mantener a todos alineados. La
                    productividad de nuestro equipo ha aumentado significativamente."
                  </p>

                  {/* Animated quote marks *}
                  <div className="absolute -left-2 -top-2 text-4xl text-cyan-500/10 transition-all duration-500 group-hover:text-cyan-500/20">
                    "
                  </div>
                  <div className="absolute -bottom-5 -right-2 text-4xl text-cyan-500/10 transition-all duration-500 group-hover:text-cyan-500/20">
                    "
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border bg-card p-1 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative rounded-xl bg-card p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-amber-500/20 bg-amber-500/5 shadow-sm">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Foto de perfil"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Laura Martínez</h4>
                      <p className="text-sm text-muted-foreground">Estudiante de Posgrado</p>
                    </div>
                    <div className="ml-auto flex text-amber-400">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    "Como estudiante, tengo que equilibrar múltiples proyectos, plazos y responsabilidades. TaskMaster
                    me ayuda a organizar mi vida académica y personal. Las etiquetas de colores y las fechas límite son
                    características que uso todos los días."
                  </p>

                  {/* Animated quote marks *}
                  <div className="absolute -left-2 -top-2 text-4xl text-amber-500/10 transition-all duration-500 group-hover:text-amber-500/20">
                    "
                  </div>
                  <div className="absolute -bottom-5 -right-2 text-4xl text-amber-500/10 transition-all duration-500 group-hover:text-amber-500/20">
                    "
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border bg-card p-1 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative rounded-xl bg-card p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-green-500/20 bg-green-500/5 shadow-sm">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Foto de perfil"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Miguel Sánchez</h4>
                      <p className="text-sm text-muted-foreground">Gerente de Marketing, InnovaMark</p>
                    </div>
                    <div className="ml-auto flex text-amber-400">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    "Nuestro departamento de marketing maneja docenas de campañas simultáneamente. TaskMaster nos
                    permite organizar todo por proyectos, asignar responsabilidades y hacer un seguimiento del progreso.
                    Es una herramienta indispensable para nuestro equipo."
                  </p>

                  {/* Animated quote marks *}
                  <div className="absolute -left-2 -top-2 text-4xl text-green-500/10 transition-all duration-500 group-hover:text-green-500/20">
                    "
                  </div>
                  <div className="absolute -bottom-5 -right-2 text-4xl text-green-500/10 transition-all duration-500 group-hover:text-green-500/20">
                    "
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border bg-card p-1 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative rounded-xl bg-card p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-red-500/20 bg-red-500/5 shadow-sm">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Foto de perfil"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Ana López</h4>
                      <p className="text-sm text-muted-foreground">Emprendedora</p>
                    </div>
                    <div className="ml-auto flex text-amber-400">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    "Como emprendedora, tengo que usar mi tiempo de manera eficiente. TaskMaster me ayuda a priorizar
                    mis tareas diarias y a mantener el enfoque en lo que realmente importa. Las estadísticas me muestran
                    dónde estoy invirtiendo mi tiempo."
                  </p>

                  {/* Animated quote marks *}
                  <div className="absolute -left-2 -top-2 text-4xl text-red-500/10 transition-all duration-500 group-hover:text-red-500/20">
                    "
                  </div>
                  <div className="absolute -bottom-5 -right-2 text-4xl text-red-500/10 transition-all duration-500 group-hover:text-red-500/20">
                    "
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border bg-card p-1 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative rounded-xl bg-card p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-purple-500/20 bg-purple-500/5 shadow-sm">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Foto de perfil"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Javier Morales</h4>
                      <p className="text-sm text-muted-foreground">Desarrollador de Software</p>
                    </div>
                    <div className="ml-auto flex text-amber-400">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    "He probado muchas herramientas de gestión de tareas, pero TaskMaster es la más intuitiva y
                    flexible. La capacidad de crear espacios de trabajo para diferentes proyectos y colaborar con otros
                    desarrolladores hace que sea perfecta para mi flujo de trabajo."
                  </p>

                  {/* Animated quote marks *}
                  <div className="absolute -left-2 -top-2 text-4xl text-purple-500/10 transition-all duration-500 group-hover:text-purple-500/20">
                    "
                  </div>
                  <div className="absolute -bottom-5 -right-2 text-4xl text-purple-500/10 transition-all duration-500 group-hover:text-purple-500/20">
                    "
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-purple-600 px-8 py-6 text-lg shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Únete a ellos
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section with Glassmorphism *}
        <section className="container py-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-purple-600 p-8 shadow-xl md:p-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            {/* Animated particles *}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-white/30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.3,
                    animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                    animationDelay: `${Math.random() * 10}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
                Comienza a organizar tus tareas hoy mismo
              </h2>
              <p className="mb-10 text-xl text-white/80">
                Únete a miles de personas y equipos que ya están mejorando su productividad con TaskMaster. Regístrate
                gratis y descubre cómo podemos ayudarte.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden rounded-full bg-white px-8 py-6 text-lg font-bold text-primary shadow-lg transition-all duration-300 hover:bg-white/90 hover:shadow-xl"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Crear cuenta gratis
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="group relative overflow-hidden rounded-full border-2 border-white/50 bg-transparent px-8 py-6 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-white/10 hover:shadow-xl"
                  >
                    <span className="relative z-10">Iniciar sesión</span>
                    <span className="absolute inset-0 -z-10 translate-y-[105%] rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-y-0" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground shadow-lg shadow-primary/20">
                <ListTodo className="h-6 w-6" />
              </div>
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                TaskMaster
              </span>
            </div>
            <nav className="flex flex-wrap justify-center gap-8">
              <Link href="#features" className="text-muted-foreground transition-colors hover:text-foreground">
                Características
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                Precios
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                Blog
              </Link>
              <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                Contacto
              </Link>
            </nav>
            <div className="flex gap-4">
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} TaskMaster. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer> */}

      {/* CSS Animations */}
      {/* <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient-text {
          animation: shimmer 8s linear infinite;
        }
        
        .bg-300\% {
          background-size: 300% 100%;
        }
      `}</style> */}
      </>
  )
}
