"use server"

import { auth } from "@/auth.config";
import prisma from "@/lib/db/prisma";

// Acción de servidor para recuperar las etiquetas del usuario.
export async function getTags() {
    // Extracción del id del usuario
    const session = await auth();

    // Petición de las etiquetas al backend.
    return await prisma.userTag.findMany({
        where: { userId: session?.user.id },
        select: { id: true, name: true, color: true }
    });
}