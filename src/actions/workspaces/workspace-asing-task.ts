"use server"

import z from "zod";
import todoApi from "@/lib/api/todo-api";

const AssingSchema = z.object({
    username: z.string().min(5).max(50)
})

/**
 * Assigna un miembro a una tarea en el espacio de trabajo
 * @param id - Id de la tarea
 * @param username - Nombre de usuario del miembro 
 * @returns Objeto con el error
 */
export async function assingWorkSpaceTask(id: string, formData: FormData) {
    const fields = Object.fromEntries(formData.entries());
    const validated = AssingSchema.safeParse(fields);

    console.log({ validated });
    

    if (!validated.success) {
        return { 
            error: true,
            message: "Datos incorrectos"
        };
    }

    try {
        // Realiza la petición GET a la API
        await todoApi.post(`/todo/workspace/tasks/${id}/add-user/`, { username: validated.data });

        // Retorna los datos obtenidos en caso de éxito
        return { error: false };
        
    } catch (error) {
        // En caso de error, lo imprime en consola
        console.log(error);
        // Retorna un objeto indicando que hubo un error
        return { error: true };
    }
}