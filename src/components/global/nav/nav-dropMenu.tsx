"use client";

import { usePathname, useRouter } from "next/navigation";
import { memo, useCallback, type FC } from "react";
import { ClipboardCheck, LogOut, SquareChartGantt, UserPen } from "lucide-react";
import { logout } from "@/actions/auth/logout";
import { Avatar } from "@/components/ui/avatar";
import { showSuccessToast, showErrorToast } from "@/components/ui/sonner";

import * as DropdownMenu from "@/components/ui/dropdown-menu";  

export const NavDropMenu: FC<{ username?: string }> = memo(({ username }) => {
    // Hook de Next js para obtener el path de la ruta del lado del cliente.
    const pathName = usePathname();
    // Hook de Next js para realizar la navegación del lado del cliente.
    const { push, refresh, replace } = useRouter();

    // Función de manejo del cierre de sesión.
    const handleClick = useCallback(
        async() => {
            // Cierre de la sesión en el servidor.
            const { result, message } = await logout(); 
   
            // Manejo de la respuesta.
            if (result) {
                showSuccessToast({ title: message }); 
            } else {
                return showErrorToast({ title: message });
            }
   
           // Se realiza una forma de actualización diferente dependiendo en que ruta
           // se encuentre el usuario en ese momento.
           if (pathName === "/") refresh();
           else replace("/");
        },
        [username],
    )

    return (
        <DropdownMenu.Root>
            {/* Botón que realiza la acción de abrir el menú */}
            <DropdownMenu.Trigger className="cursor-pointer">
                <Avatar>
                    { username ? username.slice(0, 2).toUpperCase(): "CR" }
                </Avatar>
            </DropdownMenu.Trigger>

            {/* Contenido a mostrar en el menú */}
            <DropdownMenu.Content className="mr-4 md:m-0">
                <DropdownMenu.Label>
                    Opciones
                </DropdownMenu.Label>
                
                <DropdownMenu.Separator />

                <DropdownMenu.Group>
                    <DropdownMenu.Item onClick={() => push("/dashboard")} className="flex md:hidden">
                        <ClipboardCheck className="w-6 h-6"/>
                        Tareas
                    </DropdownMenu.Item>
                    <DropdownMenu.Item onClick={() => push("/dashboard/workspaces")} className="flex md:hidden">
                        <SquareChartGantt className="w-6 h-6"/>
                        Espacios
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                        <UserPen className="w-6 h-6"/>
                        Perfil
                    </DropdownMenu.Item>
                </DropdownMenu.Group>
                
                <DropdownMenu.Separator className="flex md:hidden"/>

                <DropdownMenu.Item onClick={handleClick} variant="destructive">
                    <LogOut className="w-6 h-6"/>
                    Cerrar sesión
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
})
