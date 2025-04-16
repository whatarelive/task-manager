import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const LastSection = () => {
    return (
        <section className="container mx-auto px-4 py-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-purple-600 p-8 shadow-xl md:p-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute h-3 w-3 rounded-full bg-white/30"
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
    )
}
