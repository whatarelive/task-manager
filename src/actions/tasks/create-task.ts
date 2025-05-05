"use server"

import z from "zod";
import { revalidateTag } from "next/cache";
import { auth } from "@/auth.config";
import prisma from "@/lib/db/prisma";

// Esquema de validación para el formulario de creación de etiquetas.
const CreateTaskSchema = z.object({
    title: z.string().min(5).max(150),
    finalAt: z.date(),
    tags: z.array(z.string()),
});

// Interfaz de como esta estructurado el objeto de la petición
interface Data {
    title?: string;
    finalAt?: Date;
    tags?: string[];
}

// Acción de servidor para la creación de tareas de los usuarios en la plataforma.
export async function createTask(fields: Data) {
    // Validar los datos usando Zod
    const { data, success } = await CreateTaskSchema.safeParseAsync(fields);
    
    // Si los datos son incorrectos
    if (!success) {
        return {
            result: false,
            message: "Datos incorrectos",
        }
    }
 
    // Extracción de la id del usuario.
    const session = await auth();

    try {
        // Creación de la tarea en la base de datos 
        await prisma.userTask.create({
            data: {
                title: data.title,
                finalAt: data.finalAt,
                userId: session?.user.id!,
                tags: {
                    connect: data.tags.map((id) => ({ id }))                    
                },
            },
        });
        
    } catch (error) {
        // Mensaje según el error sucedido
        const message = (error as any).code === "P2003"
            ? "Usuario incorrecto" 
            : "Fallo la creación de la tarea";
        
        return { result: false, message };
    }

    // Revalidación de los datos de las páginas
    revalidateTag("tasks-data");
    revalidateTag("tasks-summary");
        
    return {
        result: true,
        message: `Tarea creada correctamente`,
    }
}