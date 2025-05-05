"use server"

import prisma from "@/lib/db/prisma";
import { revalidateTag } from "next/cache";

// Acción del servidor para eliminar una tarea del usuario.
export async function removeTask(id: string) {
    try {
        // Eliminar la tarea de la base de datos.
        await prisma.userTask.delete({
            where: { id },
        });

    } catch (error) {    
        // Mensaje según el error sucedido.
        const message = (error as any).code === "P2025"
            ? "No existe la tarea" 
            : "Fallo la creación de la tarea";
        
        return { result: false, message };
    }

    // Revalidación de los datos de las páginas.
    revalidateTag("tasks-data");
    revalidateTag("tasks-summary");

    return { 
        result: true,
        message: "Tarea eliminada"
    };
}