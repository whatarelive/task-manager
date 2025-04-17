"use server";

import { signIn } from "@/auth.config";
import type { StateForm } from "@/interfaces/data.interfaces";


// Acción de servidor para el inicio de sesión de los usuarios en la plataforma.
export async function login(formData: FormData): Promise<StateForm> { 
    // Convertir el FormData a un objeto plano para poder validarlo.
    const fields = Object.fromEntries(formData.entries());

    try {
        // Se realiza el login a través de API de NextAuth.
        await signIn('credentials', { ...fields, redirect: false })

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
