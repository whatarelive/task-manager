"use server"

import { StateForm } from "@/interfaces/data.interfaces";
import prisma from "@/lib/prisma";

export async function deleteTags(id: string): Promise<StateForm> {
    try {
        const tag = await prisma.tags.delete({
            where: { id },
            select: { name: true },
        });

        return {
            result: true,
            message: `Etiqueta ${tag.name} eliminada` 
        }

    } catch (_error) {

        return {
            result: false,
            message: "Fallo eliminación de la etiqueta"
        }
    }
}