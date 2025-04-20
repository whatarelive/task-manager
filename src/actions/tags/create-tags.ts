"use server"

import z from "zod";
import { revalidatePath } from "next/cache";
import type { StateForm } from "@/interfaces/data.interfaces";


const CreateTagSchema = z.object({
    name: z.string().max(50),
    color: z.string().min(7).includes("#")
});



export async function createTags(formData: FormData): Promise<StateForm> {
    const fields = Object.fromEntries(formData.entries());

    const { success, data } = CreateTagSchema.safeParse(fields);

    if (!success) {
        return {
            result: false,
            message: "Información incorrecta"
        }
    }

    try {
        
    
    } catch (_error) {
        return {
            result: false,
            message: "Fallo la creación de la etiqueta"
        }
    }

    revalidatePath("/dashboard");

    return {
        result: true,
        message: `Etiqueta ${data.name} creada`
    }
}