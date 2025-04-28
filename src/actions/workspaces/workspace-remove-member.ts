"use server"

import todoApi from "@/lib/api/todo-api";

/**
 * Elimina un miembro existente en el espacio de trabajo
 * @param id - Ids del espacio de trabajo
 * @returns Objeto con el error
 */
export async function removeWorkSpaceMember(id: string, username: string) {
    try {
        // Realiza la petición GET a la API
        await todoApi.delete(`/todo/workspaces/${id}/remove-user/${username}`);

        // Retorna los datos obtenidos en caso de éxito
        return { error: false };
        
    } catch (error) {
        // En caso de error, lo imprime en consola
        console.log(error);
        // Retorna un objeto indicando que hubo un error
        return { error: true };
    }
}