import Link from "next/link";
import { auth } from "@/auth.config";
import { Logo } from "@/components/global/Logo";
import { LinkButton } from "@/components/global/LinkButton";
import { NavLinks } from "@/components/global/nav/nav-links";
import { NavDropMenu } from "@/components/global/nav/nav-dropMenu";

export async function NavBar() {
    // Se recupera la sesión del usuario
    const session = await auth();

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
                    session?.isAuthenticated
                        ? <NavDropMenu username={session.user.username}/>
                        : <LinkButton href="/auth/login" label="Iniciar Sesión"/>
                }
            </div>
      </header>
    )
}
