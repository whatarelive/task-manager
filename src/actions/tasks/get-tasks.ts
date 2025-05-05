"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/db/prisma";
import type { TaskStatus } from "@prisma/client";

// Acción del servidor para obtener todas las tareas del usuario
export async function getTask(status?: TaskStatus) {
    // Extracción de la id del usuario
    const session = await auth();

    // Recuperar las tareas del base de datos según el estado 
    return await prisma.userTask.findMany({
        where: { 
            userId: session?.user.id,
            status: status,
        },
        include: {
            tags: true,
        }
    });
}