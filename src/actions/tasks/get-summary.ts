"use server";

import { unstable_cache } from "next/cache";
import prisma from "@/lib/db/prisma";

// Obtener un resumen de las tareas del usuario.
export const getSummary = unstable_cache(
    // Acción de servidor
    async (userId: string) => {
        // Extracción de las tareas de la base de datos.
        const tasks = await prisma.userTask.findMany({
            where: { userId },
            select: { status: true },
        });

        // Calculo de las tareas completadas del usuario.
        const completed = tasks.filter((task) => task.status === "COMPLETED").length;
        
        return {
            total: tasks.length,
            pending: tasks.length - completed,
            completed,
        }
    },
    // Clave única para esta consulta.
    ["all-tasks-summary"],
    // Opciones de caché con el resumen de las tareas.
    { tags: ["tasks-summary"] },
)