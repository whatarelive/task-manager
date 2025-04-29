"use server"

import todoApi from "@/lib/api/todo-api";
import type { Tag } from "@/interfaces/data.interfaces";


// Acción de servidor para eliminar una etiqueta
export async function removeTag(id: number, workSpaceId?: string | null) {
    const url = workSpaceId 
        ? `/todo/workspaces/${workSpaceId}/tags/${id}/delete/` 
        : `/todo/user/tags/${id}/delete/`;

    try {
        // Se realiza la petición de eliminación a la API
        await todoApi.delete<Tag>(url);
        
        // Se devuelve un objeto con la data dentro.
        return { error: false };
    
    } catch (error) {
        console.log(error);
        // Se devuelve el error.
        return { error: true };
    }
}