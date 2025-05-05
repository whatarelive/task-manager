"use server"

import { auth } from "@/auth.config";
import prisma from "@/lib/db/prisma";

// Acción de servidor para recuperar las etiquetas del usuario.
export async function getTags() {
    // Extracción del id del usuario
    const session = await auth();

    // Extracción de las etiquetas de la base de datos.
    return await prisma.userTag.findMany({
        where: { userId: session?.user.id },
        select: { id: true, name: true, color: true }
    });
}