"use server";

import z from "zod";
import { signIn } from "@/auth.config";
import type { StateForm } from "@/interfaces/data.interfaces";

const LoginSchema = z.object({
    username: z.string().min(5).max(50),
    password: z.string().min(5).max(25).regex(/^[a-zA-Z0-9]+$/),
});


// Acción de servidor para el inicio de sesión de los usuarios en la plataforma.
export async function login(formData: FormData): Promise<StateForm> { 
    // Convertir el FormData a un objeto plano para poder validarlo.
    const fields = Object.fromEntries(formData.entries());

    // Validar los datos usando Zod schema para asegurar que cumplen con el formato requerido
    const validated = LoginSchema.safeParse(fields);

    // Si la validación falla, retornar los errores específicos de cada campo
    if(!validated.success) {
        return {
            result: false,
            message: "Credenciales incorrectas"
        }
    }
 
    try {
        // Se realiza el login a través de API de NextAuth.
        await signIn('credentials', { ...validated.data, redirect: false })

        return { 
            result: true,
            message: "Inicio de sesión exitoso",
        };

    } catch (error) {
        // Si falla el registro en la Base de Datos se notifica a la UI.
        return {
            result: false,
            message: "Credenciales incorrectas",
        }
    }    
}
