"use server"

import z from "zod";
import todoApi from "@/lib/api/todo-api";
import type { Tag } from "@/interfaces/data.interfaces";
import { error } from "console";


// Esquema de validación para el formulario de creación de etiquetas.
const CreateTagSchema = z.object({
    name: z.string().min(5).max(50),
    color: z.string().includes("#").min(4).max(7),
});


// Acción de servidor para la creación de etiquetas de los usuarios en la plataforma.
export async function createTag(formData: FormData) {
    // Convertir el FormData a un objeto plano para poder validarlo
    const fields = Object.fromEntries(formData.entries());
    
    // Validar los datos usando Zod schema para asegurar que cumplen con el formato requerido
    const validated = await CreateTagSchema.safeParseAsync(fields);
    
    // Si la validación falla, retornar los errores específicos de cada campo
    if (!validated.success) {
        return {
            error: true,
            message: "Datos incorrectos proporcionados",
        }
    }
 
    try {
        // Se realiza la petición POST al backend para guardar la etiqueta
        const { data } = await todoApi.post<Tag>("/todo/user/tags/", { ...validated.data });
        
        // Se notifica a la UI del registro exitoso de la etiqueta
        return {
            data,
            message: `Etiqueta creada correctamente`,
        }

    } catch (error) {
        console.log(error);
        
        // Se notifica a la UI del error en la creación de la etiqueta
        return {
            error: true,
            message: "Fallo la creación de la etiqueta",
        }
    }
}