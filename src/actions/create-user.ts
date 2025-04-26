"use server";

import z from "zod";
import todoApi from "@/lib/api/todo-api";
import type { StateForm } from "@/interfaces/data.interfaces";
import type { UserRegisterResponse } from "@/interfaces/auth.interfaces";


// Esquema de validación para el formulario de registro del usuario.
const RegisterSchema = z.object({
    username: z.string().min(5).max(50),
    email: z.string().email().max(254),
    first_name: z.string().min(3).max(50),
    last_name: z.string().min(3).max(50),
    password: z.string().min(5).max(25).regex(/^[a-zA-Z0-9]+$/),
});


// Acción de servidor para el registro de usuarios en la plataforma.
export async function createUser(formData: FormData): Promise<StateForm> { 
    // Convertir el FormData a un objeto plano para poder validarlo
    const fields = Object.fromEntries(formData.entries());
    
    // Validar los datos usando Zod schema para asegurar que cumplen con el formato requerido
    const validated = await RegisterSchema.safeParseAsync(fields);

    // Si la validación falla, retornar los errores específicos de cada campo
    if (!validated.success) {
        return {
            result: false,
            message: "Credenciales incorrectas",
        }
    }

    try {
        // Se guarda el usuario en la Base de Datos
        const { data } = await todoApi.post<UserRegisterResponse>(
            "/user/register/", 
            { ...validated.data }
        );

        if (!data.email || data.username) throw new Error("API_Error");

        return { 
            result: true,
            message: `Usuario ${data.username} registrado`
        };

    } catch (error) {
        // Si falla el registro en la Base de Datos se notifica a la UI.
        return {
            result: false,
            message: "Registro de usuario fallido",
        }
    }    
}