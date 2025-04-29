"use server"

import z from "zod";
import todoApi from "@/lib/api/todo-api";
import type { WorkSpace } from "@/interfaces/data.interfaces";


// Esquema de validación para el formulario de creación de espacios de trabajo
// Define las reglas que deben cumplir los campos del formulario
const CreateWorkSpaceSchema = z.object({
    title: z.string().min(5).max(50),
    description: z.string().min(1).max(120)
})


/**
 * Función de acción del servidor para crear un nuevo espacio de trabajo
 * @param formData - Datos del formulario enviados desde el cliente
 * @returns Objeto con resultado de la operación (éxito o error)
 */
export async function createWorkSpace(formData: FormData) {
    // Convertir el FormData a un objeto plano para poder validarlo
    const fields = Object.fromEntries(formData.entries());

    // Validar los datos usando el esquema de Zod definido anteriormente
    // safeParseAsync permite manejar la validación de forma asíncrona
    const validated = await CreateWorkSpaceSchema.safeParseAsync(fields);

    // Si la validación falla, retornar un objeto con el error
    if (!validated.success) {
        return {
            error: true,
            message: "Datos incorrectos proporcionados",
        }
    }

    try {
        // Se realiza la petición POST al backend para crear el nuevo espacio de trabajo
        const { data } = await todoApi.post<WorkSpace>("/todo/workspaces/", { ...validated.data });
        
        // En caso de éxito, se retorna el objeto creado y un mensaje de confirmación
        return { 
            data,
            message: "Espacio de trabajo creado"
        }

    } catch (error) {
        // En caso de error en la petición, se registra en la consola
        console.log(error);

        // Se retorna un objeto indicando el error para mostrar al usuario
        return { 
            error: true,
            message: "Fallo la creación del espacio de trabajo"
        }
    }
}