"use client";

import { useRouter } from "next/navigation";
import { memo, useCallback, type FC } from "react";
import { ClipboardCheck, LogOut, SquareChartGantt } from "lucide-react";
import { logout } from "@/actions/auth/logout";
import { useTagStore } from "@/store/tag-store";
import { useTaskStore } from "@/store/task-store";
import { Avatar } from "@/components/ui/avatar";
import { showSuccessToast, showErrorToast } from "@/components/ui/sonner";
import * as DropdownMenu from "@/components/ui/dropdown-menu";  


export const NavDropMenu: FC<{ username?: string }> = memo(({ username }) => {
    const router = useRouter();

    const clearTags = useTagStore((state) => state.clearTags);
    const clearTask = useTaskStore((state) => state.clearStore);

    // Función de manejo del cierre de sesión.
    const handleClick = useCallback( async () => {
        // Cierre de la sesión en el servidor.
        const { result, message } = await logout(); 

        // Manejo de la respuesta.
        if (result) {
            clearTags();
            clearTask();

            showSuccessToast({ title: message }); 

            router.replace("/");
        }
        else return showErrorToast({ title: message });
    
    }, [username])

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
                    <DropdownMenu.Item onClick={() => router.push("/dashboard?tab=all")} className="flex md:hidden">
                        <ClipboardCheck className="w-6 h-6"/>
                        Tareas
                    </DropdownMenu.Item>
                    <DropdownMenu.Item onClick={() => router.push("/dashboard/workspaces")} className="flex md:hidden">
                        <SquareChartGantt className="w-6 h-6"/>
                        Espacios
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
