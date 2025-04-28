"use server"

import todoApi from "@/lib/api/todo-api";

/**
 * Agrega un nuevo miembro al espacio de trabajo
 * @param id - Ids del espacio de trabajo
 * @returns Objeto con el error
 */
export async function addWorkSpaceMember(id: string, username: string) {
    try {
        // Realiza la petición GET a la API
        const { data } = await todoApi.post(`/todo/workspaces/${id}/add-user/`, { username });

        // Retorna los datos obtenidos en caso de éxito
        return { error: false };
        
    } catch (error) {
        // En caso de error, lo imprime en consola
        console.log(error);
        // Retorna un objeto indicando que hubo un error
        return { error: true };
    }
}