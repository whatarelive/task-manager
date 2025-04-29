"use server"

import todoApi from "@/lib/api/todo-api";
import type { WorkSpace } from "@/interfaces/data.interfaces";

/**
 * Obtiene la información del espacio de trabajo desde la API
 * @param id - Ids del espacio de trabajo
 * @returns Objeto con los datos del espacio de trabajo o error
 */
export async function getWorkSpaceInfo(id: string) {
    try {
        // Realiza la petición GET a la API
        const { data } = await todoApi.get<WorkSpace>(`/todo/workspaces/${id}`);
        // Retorna los datos obtenidos en caso de éxito
        return { data };
        
    } catch (error) {
        // En caso de error, lo imprime en consola
        console.log(error);
        // Retorna un objeto indicando que hubo un error
        return { error: true };
    }
}