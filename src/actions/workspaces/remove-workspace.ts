"use server"

import todoApi from "@/lib/api/todo-api";

/**
 * Elimina un espacio de trabajo por su ID mediante una petición a la API
 * @param id - Identificador numérico del espacio de trabajo a eliminar
 * @returns Objeto con estado de error (true en caso de fallo, false en caso de éxito)
 */
export async function removeWorkSpace(id: number) {
    try {
        // Realiza una petición DELETE a la API para eliminar el espacio de trabajo
        await todoApi.delete(`/todo/workspaces/${id}/`);
    
        // Retorna un objeto indicando que la operación fue exitosa
        return { error: false };        
    
    } catch (error) {
        // En caso de error en la petición, lo registra en la consola
        console.log(error);
        
        // Retorna un objeto indicando que hubo un error en la operación
        return { error: true };
    }   
}