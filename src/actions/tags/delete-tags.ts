"use server"

import type { StateForm } from "@/interfaces/data.interfaces";


export async function deleteTags(id: string): Promise<StateForm> {
    try {

        return {
            result: true,
            message: `Etiqueta ${"tag.name"} eliminada` 
        }

    } catch (_error) {

        return {
            result: false,
            message: "Fallo eliminación de la etiqueta"
        }
    }
}