"use server";

import z from "zod";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import type { StateForm } from "@/interfaces/data.interfaces";


// Esquema de validación para el formulario de registro del usuario.
const RegisterSchema = z.object({
    username: z.string().min(5).max(50),
    email: z.string().email().max(120),
    password: z.string().min(5).max(16).regex(/^[a-zA-Z0-9]+$/),
});


// Acción de servidor para el registro de usuarios en la plataforma.
export async function createUser(formData: FormData): Promise<StateForm> { 
    // Convertir el FormData a un objeto plano para poder validarlo
    const fields = Object.fromEntries(formData.entries());
    
    // Validar los datos usando Zod schema para asegurar que cumplen con el formato requerido
    const { success, data } = await RegisterSchema.safeParseAsync(fields);

    // Si la validación falla, retornar los errores específicos de cada campo
    if (!success) {
        return {
            result: false,
            message: "Credenciales incorrectas",
        }
    }

    try {
        // Encriptación de la contraseña
        const passwordHash = bcryptjs.hashSync(data.password);

        // Se guarda el usuario en la Base de Datos
        await prisma.user.create({
            data: {
                email: data.email.toLowerCase(),
                username: data.username,
                password: passwordHash
            }
        });

        return { 
            result: true,
            message: "Usuario registrado"
        };

    } catch (error) {
        // Si falla el registro en la Base de Datos se notifica a la UI.
        return {
            result: false,
            message: "Registro de usuario fallido",
        }
    }    
}