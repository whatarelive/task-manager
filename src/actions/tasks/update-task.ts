"use server"

import { revalidateTag } from "next/cache";
import prisma from "@/lib/db/prisma";

// Acción para actualizar una de las tareas de un usuario.
export async function completeTask(id: string, status: boolean) {
    try {
        // Actualizar la tarea en la base de datos
        await prisma.userTask.update({
            where: { id },
            data: { status: !status ? "COMPLETED" : "PENDING" },
        });

    } catch (error) {    
        // Mensaje según el error sucedido
        const message = (error as any).code === "P2025"
            ? "Usuario incorrecto" 
            : "Fallo la creación de la tarea";
        
        return { result: false, message };
    }

    // Revalidación de los datos de las páginas
    revalidateTag("tasks-data");
    revalidateTag("tasks-summary");

    return { 
        result: true,
        message: "Tarea actualizada"
    };
}