"use server"

import z from "zod";
import todoApi from "@/lib/api/todo-api";
import type { Task } from "@/interfaces/data.interfaces";


// Esquema de validación para el formulario de creación de etiquetas.
const CreateTaskSchema = z.object({
    title: z.string().min(5).max(150),
    final_at: z.date(),
    tags: z.array(z.number()),
});

type Data = {
    title?: string;
    final_at?: Date;
    tags?: number[];
}

// Acción de servidor para la creación de tareas de los usuarios en la plataforma.
export async function createTask(fields: Data, workSpaceId: string | null) {
    // Validar los datos usando Zod schema para asegurar que cumplen con el formato requerido
    const validated = await CreateTaskSchema.safeParseAsync(fields);
    
    // Si la validación falla, retornar los errores específicos de cada campo
    if (!validated.success) {
        return {
            error: true,
            message: "Datos incorrectos proporcionados",
        }
    }
 
    const url = workSpaceId ? `/todo/workspaces/${workSpaceId}/tasks/` : "/todo/user/tasks/"

    try {
        // Se realiza la petición POST al backend para guardar la etiqueta
        const { data } = await todoApi.post<Task>(url, { ...validated.data });
        
        // Se notifica a la UI del registro exitoso de la etiqueta
        return {
            data,
            message: `Tarea creada correctamente`,
        }

    } catch (error) {
        console.log(error);
        
        // Se notifica a la UI del error en la creación de la etiqueta
        return {
            error: true,
            message: "Fallo la creación de la tarea",
        }
    }
}