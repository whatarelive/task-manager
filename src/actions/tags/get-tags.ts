"use server"

import { unstable_cache } from "next/cache";
import prisma from "@/lib/db/prisma";

// Acción de servidor para recuperar las etiquetas del usuario.
export const getTags = unstable_cache(
    // Acción de servidor
    async (userId: string) => {
        // Extracción de las etiquetas de la base de datos.
        return await prisma.userTag.findMany({
            where: { userId },
            select: { id: true, name: true, color: true }
        });
    },
    // Clave única para esta consulta.
    ["all-tags"],
    // Opciones de caché con etiquetas.
    { tags: ["tags-data"] },    
)