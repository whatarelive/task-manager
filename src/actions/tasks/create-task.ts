"use server"

import z from "zod";
import { revalidateTag } from "next/cache";
import { auth } from "@/auth.config";
import prisma from "@/lib/db/prisma";

// Esquema de validación para el formulario de creación de etiquetas.
const CreateTaskSchema = z.object({
    title: z.string().min(5).max(150),
    primaryTag: z.string().uuid(),
    secondaryTag: z.string().uuid().optional(),
    isMoreTags: z.boolean(),
    finalAt: z.date().min(new Date()),
})
.refine((data) => data.isMoreTags && !!data.secondaryTag === false, {
    message: "secondaryTag is required when isMoreTags is true",
    path: ['secondaryTag']
});

// Interfaz de como esta estructurado el objeto de la petición
interface Data {
    title?: string;
    primaryTag?: string;
    secondaryTag?: string;
    finalAt?: Date;
    isMoreTags: boolean;
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
    // Validación de la sesión del usuario.
    if (!session || !session.user.id) {
        return {
            result: false,
            message: "Usuario invalido"
        }
    }

    try {
        // Creación de la tarea en la base de datos 
        await prisma.userTask.create({
            data: {
                title: data.title,
                finalAt: data.finalAt,
                userId: session.user.id,
                tags: {
                    connect: [data.primaryTag, data.secondaryTag].map((id) => ({ id }))                    
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