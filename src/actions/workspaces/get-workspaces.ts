"use server"

import todoApi from "@/lib/api/todo-api";
import type { WorkSpaceGet } from "@/interfaces/data.interfaces";

/**
 * Obtiene los espacios de trabajo desde la API
 * @param query - Término de búsqueda opcional para filtrar los espacios de trabajo
 * @returns Objeto con los datos de los espacios de trabajo o error
 */
export async function getWorkSpaces(query: string) {
    // Construye la URL basada en si hay un parámetro de búsqueda
    const url = query.length >= 1 ? `/todo/workspaces?search=${query}` : "/todo/workspaces/";

    try {
        // Realiza la petición GET a la API
        const { data } = await todoApi.get<WorkSpaceGet>(url);
        // Retorna los datos obtenidos en caso de éxito
        return { data };
    } catch (error) {
        // En caso de error, lo imprime en consola
        console.log(error);
        // Retorna un objeto indicando que hubo un error
        return { error: true };
    }
}