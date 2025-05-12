"use server"

import prisma from "@/lib/db/prisma";
import { revalidateTag } from "next/cache";

// Acción de servidor para eliminar una etiqueta del usuario
export async function removeTag(id: string) {
    try {
        // Eliminación de la etiqueta en la base de datos
        await prisma.userTag.delete({
            where: { id },
            select: { name: true },
        });
        
    } catch (error) {
        // Mensaje según el error sucedido
        const message = (error as any).code === "P2025" 
            ? "No existe la etiqueta" 
            : "Fallo la eliminación de la tarea";
        
        return { result: false, message };
    }

    revalidateTag('tags-data');
    revalidateTag('tasks-data');

    return { 
        result: true,
        message: `Etiqueta eliminada`, 
    };
}