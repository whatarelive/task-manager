"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTagStore } from "@/store/tag-store";
import { InputSearch } from "@/components/global/InputSearch";
import { CreateTaskModal } from "@/components/dashboard/tasks/CreateTaskModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export const ToolsBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const tags = useTagStore((state) => state.tags);    
    const [ selectedTag, setSelectedTag ] = useState<string>("all");

    useEffect(() => {
        // Crear una nueva instancia de URLSearchParams
        const params = new URLSearchParams(searchParams.toString())
        
        // Actualizar o añadir el parámetro
        if (selectedTag !== "all") params.set("tag", selectedTag);
        else params.delete("tag");

        // Navegar a la misma ruta pero con los parámetros actualizados
        router.push(`?${params.toString()}`)
    }, [selectedTag]);

    return (
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-3xl font-bold">Mis Tareas</h1>

            <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
                <InputSearch label="Buscar tareas"/>

                <Select value={selectedTag} onValueChange={setSelectedTag}>
                    <SelectTrigger className="w-full md:w-44">
                        <SelectValue placeholder="Filtrar por etiqueta" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las etiquetas</SelectItem>
                        {
                            tags?.map((tag) => (
                                <SelectItem key={tag.id} value={tag.name}>
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full" style={{ background: tag.color }}/>
                                        <span>{tag.name}</span>
                                    </div>
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                
                <CreateTaskModal/>
            </div>
    </div>
    )
}