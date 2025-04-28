"use server"

import todoApi from "@/lib/api/todo-api";
import type { Tag } from "@/interfaces/data.interfaces";

interface Props {
    count: number;
    results: Tag[];
}

// Acción de servidor para recuperar las etiquetas.
export async function getWorkSpacesTags(id: string) {
    try {
        // Petición de las etiquetas al backend.
        const { data } = await todoApi.get<Props>(`/todo/workspaces/${id}/tags/`);

        // Se devuelve un objeto con la data dentro.
        return { data: data.results };

    } catch (error) {
        console.log(error);
        
        // Se devuelve el error
        return { error: true };
    }
}