"use server"

import z from "zod";
import prisma from "@/lib/db/prisma";
import { auth } from "@/auth.config";

// Esquema de validación para el formulario de creación de etiquetas.
const CreateTagSchema = z.object({
    name: z.string().min(1).max(50),
    color: z.string().includes("#").min(4).max(7),
});

// Acción de servidor para la creación de etiquetas de los usuarios en la plataforma.
export async function createTag(formData: FormData) {
    // Convertir el FormData a un objeto plano y validarlo con Zod
    const fields = Object.fromEntries(formData.entries());
    const validated = CreateTagSchema.safeParse(fields);
    
    // Si los datos son incorrectos
    if (!validated.success) {
        return {
            result: false,
            message: "Datos incorrectos",
        }
    }

    // Extración del id del usuario
    const session = await auth();

    try {
        // Creación de la etiqueta en la base de datos
        const tag = await prisma.userTag.create({
            data: {
                ...validated.data,
                userId: session?.user.id!,
            }
        });

        return {
            result: true,
            data: tag,
            message: `Etiqueta creada correctamente`,
        }

    } catch (error) {
        // Mensaje según el error sucedido
        const message = (error as any).code === "P2003"
            ? "Usuario incorrecto" 
            : "Fallo la creación de la etiqueta";
        
        return { result: false, message };
    }
}