"use server"

import prisma from "@/lib/db/prisma";

// Acción de servidor para eliminar una etiqueta del usuario
export async function removeTag(id: string) {
    try {
        // Eliminación de la etiqueta en la base de datos
        const { name } = await prisma.userTag.delete({
            where: { id },
            select: { name: true },
        });
        
        return { 
            result: true,
            message: `Etiqueta ${name} eliminada`, 
        };
    
    } catch (error) {
        // Mensaje según el error sucedido
        const message = (error as any).code === "P2025" 
            ? "No existe la etiqueta" 
            : "Fallo la eliminación de la tarea";
        
        return { result: false, message };
    }
}