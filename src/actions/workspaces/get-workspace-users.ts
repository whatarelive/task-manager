"use server"

import todoApi from "@/lib/api/todo-api";

/**
 * Obtiene el listado de usuarios que no son miembros del espacio de trabajo desde la API
 * @param id - Ids del espacio de trabajo
 * @returns Objeto con los datos de los usuario o error
 */
export async function getWorkSpaceNoMembers(id: string) {
    try {
        // Realiza la petición GET a la API
        const { data } = await todoApi.get<string[]>(`/todo/workspaces/${id}/non-members/`);

        // Retorna los datos obtenidos en caso de éxito
        return { data };
        
    } catch (error) {
        // En caso de error, lo imprime en consola
        console.log(error);
        // Retorna un objeto indicando que hubo un error
        return { error: true };
    }
}