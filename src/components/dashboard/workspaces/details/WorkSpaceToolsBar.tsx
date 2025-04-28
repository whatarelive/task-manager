"use client"

import { useEffect, useState, type FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTagStore } from "@/store/tag-store";
import { InputSearch } from "@/components/global/InputSearch";
import { CreateMemberTaskModal } from "@/components/dashboard/workspaces/details/WorkSpaceCreateTaskModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    isAdmin: boolean;
    members: string[];
    workSpaceName: string;
}

export const ToolsBar: FC<Props> = ({ isAdmin, members, workSpaceName }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
        
    const tags = useTagStore((state) => state.tags);  

    const [ selectedTag, setSelectedTag ] = useState<string>("all");
    const [ selectedMember, setSelectedMember ] = useState<string>("all");
    
    useEffect(() => {
        // Crear una nueva instancia de URLSearchParams
        const params = new URLSearchParams(searchParams.toString())
        
        // Actualizar o añadir el parámetro
        if (selectedTag !== "all") params.set("tag", selectedTag);
        else params.delete("tag");

        // Actualizar o añadir el parámetro
        if (selectedMember !== "all") params.set("member", selectedMember);
        else params.delete("member");

        // Navegar a la misma ruta pero con los parámetros actualizados
        router.push(`?${params.toString()}`)
    }, [selectedTag, selectedMember]);

    return (
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-3xl font-bold">Tareas {workSpaceName}</h1>

            <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
                {/* Campo de búsqueda */}
                <InputSearch label="Buscar tareas"/>
                
                {/* Filtro de etiquetas */}
                <Select value={selectedTag} onValueChange={setSelectedTag}>
                    <SelectTrigger className="w-full md:w-44">
                        <SelectValue placeholder="Filtrar por etiqueta" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las etiquetas</SelectItem>
                        {tags && tags.map((tag) => (
                            <SelectItem key={tag.id} value={tag.name}>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full" style={{ background: tag.color }}/>
                                    <span>{tag.name}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Filtro de miembros */}
                <Select value={selectedMember} onValueChange={setSelectedMember}>
                    <SelectTrigger className="w-full md:w-44">
                        <SelectValue placeholder="Filtrar por miembro" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los miembros</SelectItem>
                        {members.map((member) => (
                            <SelectItem key={member} value={member}>{member}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                
                {/* Modal para crear una nueva tarea */}
                { isAdmin && <CreateMemberTaskModal members={members}/> }
            </div>
        </div>
    )
}
