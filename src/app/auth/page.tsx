"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ListTodo, User, Mail, Lock, ArrowRight, Sparkles } from "lucide-react"
import { SnowfallCanvas } from "@/components/global/AnimateParticle"

export default function AuthPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  })

//   Efecto para seguir la posición del mouse para efectos visuales
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulamos un inicio de sesión exitoso
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulamos un registro exitoso
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-background p-4">
      {/* Elementos de fondo animados */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradientes de fondo */}
        <div className="absolute -left-[10%] top-[5%] h-[600px] w-[600px] animate-pulse rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute -right-[15%] top-[15%] h-[500px] w-[500px] animate-pulse rounded-full bg-cyan-500/10 blur-[120px] [animation-delay:2s]" />
        <div className="absolute bottom-[5%] left-[20%] h-[700px] w-[700px] animate-pulse rounded-full bg-pink-500/10 blur-[120px] [animation-delay:4s]" />

        {/* Partículas flotantes */}
        {/* {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-2 w-2 rounded-full bg-primary/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))} */}

        {/* Formas geométricas */}
        <div
          className="absolute h-64 w-64 rounded-full border border-primary/20 bg-primary/5"
          style={{
            top: `${mousePosition.y * 0.02}px`,
            left: `${mousePosition.x * 0.02}px`,
            transform: `translate(-50%, -50%)`,
            transition: "top 0.5s ease-out, left 0.5s ease-out",
          }}
        />
        <div
          className="absolute h-40 w-40 rounded-full border border-purple-500/20 bg-purple-500/5"
          style={{
            bottom: `${mousePosition.y * 0.01}px`,
            right: `${mousePosition.x * 0.01}px`,
            transform: `translate(50%, 50%)`,
            transition: "bottom 0.7s ease-out, right 0.7s ease-out",
          }}
        />
        <div
          className="absolute h-32 w-32 rounded-md border border-cyan-500/20 bg-cyan-500/5"
          style={{
            top: `${mousePosition.y * 0.015}px`,
            right: `${mousePosition.x * 0.015}px`,
            transform: `translate(30%, -30%) rotate(${mousePosition.x * 0.02}deg)`,
            transition: "top 0.6s ease-out, right 0.6s ease-out, transform 0.6s ease-out",
          }}
        />
      </div>

      {/* Logo y enlace a inicio */}
      <Link href="/" className="absolute left-4 top-4 z-50 md:left-8 md:top-8">
        <Button
          variant="ghost"
          className="group flex items-center gap-2 transition-all duration-300 hover:bg-primary/10"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 group-hover:shadow-primary/40">
            <ListTodo className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-xl font-bold text-transparent">
            TaskMaster
          </span>
        </Button>
      </Link>

      {/* Contenedor principal con efecto de glassmorfismo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-1 shadow-2xl backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-30" />

        <div className="relative rounded-xl bg-background/80 p-6 backdrop-blur-sm sm:p-8">
          {/* Indicador de funcionalidad nueva */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex animate-shimmer items-center gap-2 rounded-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 px-4 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="h-3 w-3" />
              <span>Experiencia de autenticación mejorada</span>
            </div>
          </div>

          {/* Título con gradiente */}
          <h1 className="mb-6 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-center text-3xl font-bold text-transparent">
            {activeTab === "login" ? "Bienvenido de nuevo" : "Únete a TaskMaster"}
          </h1>

          {/* Tabs para alternar entre login y registro */}
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2 bg-muted/50">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
              >
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
              >
                Registrarse
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              {/* Formulario de inicio de sesión */}
              {activeTab === "login" && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value="login" className="mt-0">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-sm font-medium">
                          Correo electrónico
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="login-email"
                            name="email"
                            type="email"
                            placeholder="ejemplo@correo.com"
                            className="pl-10"
                            required
                            value={loginData.email}
                            onChange={handleLoginChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password" className="text-sm font-medium">
                            Contraseña
                          </Label>
                          <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                            ¿Olvidaste tu contraseña?
                          </Link>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="login-password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            required
                            value={loginData.password}
                            onChange={handleLoginChange}
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="group relative mt-2 w-full overflow-hidden rounded-full bg-gradient-to-r from-primary to-purple-600 py-6 text-lg font-medium shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                        disabled={isLoading}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </Button>

                      <div className="mt-6 text-center text-sm text-muted-foreground">
                        ¿No tienes una cuenta?{" "}
                        <button
                          type="button"
                          onClick={() => setActiveTab("register")}
                          className="text-primary hover:underline"
                        >
                          Regístrate aquí
                        </button>
                      </div>
                    </form>
                  </TabsContent>
                </motion.div>
              )}

              {/* Formulario de registro */}
              {activeTab === "register" && (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value="register" className="mt-0">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-name" className="text-sm font-medium">
                          Nombre completo
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="register-name"
                            name="name"
                            placeholder="Juan Pérez"
                            className="pl-10"
                            required
                            value={registerData.name}
                            onChange={handleRegisterChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email" className="text-sm font-medium">
                          Correo electrónico
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="register-email"
                            name="email"
                            type="email"
                            placeholder="ejemplo@correo.com"
                            className="pl-10"
                            required
                            value={registerData.email}
                            onChange={handleRegisterChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password" className="text-sm font-medium">
                          Contraseña
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="register-password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            required
                            value={registerData.password}
                            onChange={handleRegisterChange}
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="group relative mt-2 w-full overflow-hidden rounded-full bg-gradient-to-r from-primary to-purple-600 py-6 text-lg font-medium shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                        disabled={isLoading}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isLoading ? "Registrando..." : "Crear cuenta"}
                          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </Button>

                      <div className="mt-6 text-center text-sm text-muted-foreground">
                        ¿Ya tienes una cuenta?{" "}
                        <button
                          type="button"
                          onClick={() => setActiveTab("login")}
                          className="text-primary hover:underline"
                        >
                          Inicia sesión aquí
                        </button>
                      </div>
                    </form>
                  </TabsContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Tabs>
        </div>
      </motion.div>
      <SnowfallCanvas/>
    </div>
  )
}
