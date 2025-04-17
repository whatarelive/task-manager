import Link from "next/link";
import { Logo } from "@/components/global/Logo";
import { Background } from "@/components/global/Background";
import { AnimateParticle } from "@/components/global/AnimateParticle";

import type { Metadata } from "next";
import type { ILayoutProps } from "@/interfaces/components.interfaces";


export const metadata: Metadata = {
    title: "Auth | Task Manager",
};


export default function AuthLayout({ children }: ILayoutProps) {
    return (
        <section className="container flex items-center justify-center h-screen mx-auto px-4">
            {/* Logo y enlace a inicio */}
            <Link 
                href="/" 
                className="group absolute left-4 top-4 z-50 flex items-center gap-2 p-2 
                transition-all duration-300 hover:bg-primary/10 hover:rounded-xl md:left-8 md:top-8"
            >
                <Logo/>
            </Link>

            { children }

            {/* Fondo con colotes animados */}
            <Background/>

            {/* Animación de particulas */}
            <AnimateParticle cant={50} type="Snow"/>
        </section>
    )
}
