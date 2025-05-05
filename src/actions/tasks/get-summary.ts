"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/db/prisma";

// Acción de servidor para obtener un resumen de las tareas.
export async function getSummary() {
    // Extracción del id del usuario.
    const session = await auth();

    // Extracción de las tareas de la base de datos.
    const tasks = await prisma.userTask.findMany({
        where: { userId: session?.user.id },
        select: { status: true },
    });

    // Calculo de las tareas completadas del usuario.
    const completed = tasks.filter((task) => task.status === true).length;
    
    return {
        total: tasks.length,
        pending: tasks.length - completed,
        completed,
    }
}