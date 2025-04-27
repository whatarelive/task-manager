"use server"

import todoApi from "@/lib/api/todo-api";
import type { Tag } from "@/interfaces/data.interfaces";


// Acción de servidor para recuperar las etiquetas.
export async function getTags() {
    try {
        // Petición de las etiquetas al backend.
        const { data } = await todoApi.get<Tag[]>("/todo/user/tags/");

        // Se devuelve un objeto con la data dentro.
        return { data };

    } catch (error) {
        console.log(error);
        
        // Se devuelve el error
        return { error: true };
    }
}