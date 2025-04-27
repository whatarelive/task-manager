"use server"

import todoApi from "@/lib/api/todo-api";
import type { Tag } from "@/interfaces/data.interfaces";


// Acción de servidor para eliminar una etiqueta
export async function removeTag(id: number) {
    try {
        // Se realiza la petición de eliminación a la API
        const { data } = await todoApi.delete<Tag>(`/${id}`);
        
        // Se devuelve un objeto con la data dentro.
        return { data };
    
    } catch (error) {
        console.log(error);
        // Se devuelve el error.
        return { error: true };
    }
}