import Link from "next/link";
import { ListTodo } from "lucide-react";
import { NavLinks } from "@/components/global/nav/nav-links";
import { NavDropMenu } from "@/components/global/nav/nav-dropMenu";
import { buttonVariants } from "@/components/ui/button";

export async function NavBar() {
    // Se recupera la sesión del usuario
    // const session = await auth();

    return (
        <header className="sticky top-0 z-10 h-16 border-b bg-background/95 backdrop-blur shadow-md">
            <div className="container mx-auto flex h-16 items-center justify-between p-4 md:px-14 xl:px-0">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                    <ListTodo className="h-6 w-6" />
                    TaskMaster
                </Link>

                {/* Navegación del panel de administración */}
                <NavLinks />

                {/* Se comprueba la sesión del usuario para mostrar el contenido */}
                {
                    true ? (
                        <NavDropMenu/>
                    ) : (
                        <Link 
                            href="/auth/login" 
                            className={buttonVariants({ 
                                variant: "outline", 
                                // className: "hover:text-white hover:bg-green-500 hover:border-green-500" 
                            })}
                        >
                            Iniciar Sesión
                        </Link>
                    )
                }
            </div>
      </header>
    )
}
