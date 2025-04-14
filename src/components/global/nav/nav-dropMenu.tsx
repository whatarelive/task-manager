"use client";

import { useRouter } from "next/navigation";
import { ClipboardCheck, LogOut, SquareChartGantt, UserPen } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

import * as DropdownMenu from "@/components/ui/dropdown-menu";  

import type { FC } from "react";

export const NavDropMenu: FC<{ username?: string }> = ({ username }) => {
    const { push } = useRouter();

    return (
        <DropdownMenu.Root>
            {/* Botón que realiza la acción de abrir el menú */}
            <DropdownMenu.Trigger className="cursor-pointer">
                <Avatar>
                    { username ? username.slice(0, 1): "CR" }
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

                <DropdownMenu.Item onClick={() => {}} variant="destructive">
                    <LogOut className="w-6 h-6"/>
                    Cerrar sesión
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}
