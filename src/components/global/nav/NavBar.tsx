import Link from "next/link";
import { Logo } from "@/components/global/Logo";
import { NavLinks } from "@/components/global/nav/nav-links";
import { NavDropMenu } from "@/components/global/nav/nav-dropMenu";

export async function NavBar() {
    // Se recupera la sesión del usuario
    // const session = await auth();

    return (
        <header className="sticky top-0 z-50 h-16 border-b bg-background/95 backdrop-blur shadow-md">
            <div className="container mx-auto flex h-16 items-center justify-between p-4 md:px-14 xl:px-0">
                <Link href="/">
                    <Logo/>
                </Link>

                {/* Navegación del panel de administración */}
                <NavLinks />

                {/* Se comprueba la sesión del usuario para mostrar el contenido */}
                {
                    false ? (
                        <NavDropMenu/>
                    ) : (
                        <Link 
                            href="/auth" 
                            className="group py-2 text-white relative overflow-hidden rounded-full bg-gradient-to-r 
                            from-primary to-purple-600 px-6 shadow-md shadow-primary/20 transition-all duration-300 
                            hover:shadow-lg hover:shadow-primary/30"
                        >
                            <span className="relative z-10">Iniciar Sesión</span>
                            <span 
                                className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-primary opacity-0 
                                transition-opacity duration-300 group-hover:opacity-100" 
                            />
                        </Link>
                    )
                }
            </div>
      </header>
    )
}
